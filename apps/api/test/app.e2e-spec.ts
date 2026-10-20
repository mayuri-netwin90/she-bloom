import request from 'supertest';
import { vi } from 'vitest';

const sentEmails = vi.hoisted(() => [] as { to: string; subject: string; text: string }[]);
vi.mock('../src/common/mailer.js', () => ({ sendEmail: async (email: { to: string; subject: string; text: string }) => { sentEmails.push(email); } }));

import { app } from '../src/main.js';
import { database } from '../src/database/database.js';
import { hashPassword } from '../src/common/password.js';

const password = 'Correct-Horse-9';
const users = {
  active: 'e2e.active@shebloom.test',
  deactivated: 'e2e.deactivated@shebloom.test',
  invited: 'e2e.invited@shebloom.test',
  reset: 'e2e.reset@shebloom.test',
};
const login = (body: unknown) => request(app).post('/backoffice/auth/login').send(body as object);

beforeAll(async () => {
  const hash = await hashPassword(password);
  await database.query('DELETE FROM bo_users WHERE email LIKE $1', ['e2e.%@shebloom.test']);
  await database.query(
    `INSERT INTO bo_users (email, full_name, is_admin, is_moderator, status, password_hash) VALUES
     ($1, 'E2E Active', true, true, 'active', $4),
     ($2, 'E2E Deactivated', true, false, 'deactivated', $4),
     ($3, 'E2E Invited', true, false, 'invited', NULL),
     ($5, 'E2E Reset', true, false, 'active', $4)`,
    [users.active, users.deactivated, users.invited, hash, users.reset],
  );
});

afterAll(async () => {
  await database.query('DELETE FROM bo_users WHERE email LIKE $1', ['e2e.%@shebloom.test']);
  await database.end();
});

describe('POST /backoffice/auth/login', () => {
  it('logs in an active user (email is case-insensitive) and returns roles', async () => {
    const res = await login({ email: '  E2E.Active@SheBloom.test ', password });
    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeTruthy();
    expect(res.body.user).toMatchObject({ email: users.active, roles: ['ADMIN', 'MODERATOR'], isSuperAdmin: false });
    expect(res.body.user.password_hash).toBeUndefined();
  });

  it('returns the same 401 for wrong password and unknown email', async () => {
    const wrong = await login({ email: users.active, password: 'nope-nope-1' });
    const unknown = await login({ email: 'nobody@shebloom.test', password });
    expect(wrong.status).toBe(401);
    expect(unknown.status).toBe(401);
    expect(wrong.body).toEqual(unknown.body);
    expect(wrong.body.code).toBe('INVALID_CREDENTIALS');
  });

  it('never locks the account after repeated failures (RF-BO-ACC-02)', async () => {
    for (let i = 0; i < 5; i++) await login({ email: users.active, password: 'bad-password' });
    expect((await login({ email: users.active, password })).status).toBe(200);
  });

  it('rejects invited users without a password as invalid credentials', async () => {
    const res = await login({ email: users.invited, password });
    expect(res.status).toBe(401);
    expect(res.body.code).toBe('INVALID_CREDENTIALS');
  });

  it('returns 403 for a deactivated account only when the password is correct', async () => {
    expect((await login({ email: users.deactivated, password })).body.code).toBe('ACCOUNT_DEACTIVATED');
    expect((await login({ email: users.deactivated, password: 'bad-password' })).status).toBe(401);
  });

  it('issues an 8-hour session by default and a 30-day one with rememberMe', async () => {
    const lifetimeOf = async (body: object) => {
      const res = await login({ email: users.active, password, ...body });
      const { rows } = await database.query<{ secs: number }>(
        'SELECT round(extract(epoch FROM expires_at - created_at))::int AS secs FROM bo_sessions WHERE id = $1',
        [JSON.parse(Buffer.from(res.body.accessToken.split('.')[1], 'base64url').toString()).sid],
      );
      return [res.body.expiresIn, rows[0].secs];
    };
    expect(await lifetimeOf({})).toEqual([28800, 28800]);
    expect(await lifetimeOf({ rememberMe: false })).toEqual([28800, 28800]);
    expect(await lifetimeOf({ rememberMe: true })).toEqual([2592000, 2592000]);
    expect((await login({ email: users.active, password, rememberMe: 'yes' })).body.fields).toHaveProperty('rememberMe');
  });

  it('validates input', async () => {
    const empty = await login({});
    expect(empty.status).toBe(400);
    expect(empty.body.fields).toHaveProperty('email');
    expect(empty.body.fields).toHaveProperty('password');
    expect((await login({ email: 'not-an-email', password })).body.fields).toHaveProperty('email');
    expect((await login({ email: users.active, password: 'x'.repeat(257) })).status).toBe(400);
    const badJson = await request(app).post('/backoffice/auth/login').set('Content-Type', 'application/json').send('{oops');
    expect(badJson.status).toBe(400);
  });
});

describe('GET /backoffice/auth/me', () => {
  it('returns the user for a valid token and 401 otherwise', async () => {
    const { body } = await login({ email: users.active, password });
    const me = await request(app).get('/backoffice/auth/me').set('Authorization', `Bearer ${body.accessToken}`);
    expect(me.status).toBe(200);
    expect(me.body.email).toBe(users.active);
    expect((await request(app).get('/backoffice/auth/me')).status).toBe(401);
    expect((await request(app).get('/backoffice/auth/me').set('Authorization', 'Bearer forged.token.value')).status).toBe(401);
  });
});

describe('POST /backoffice/auth/logout', () => {
  const me = (token: string) => request(app).get('/backoffice/auth/me').set('Authorization', `Bearer ${token}`);
  const logout = (token?: string) => {
    const req = request(app).post('/backoffice/auth/logout');
    return token ? req.set('Authorization', `Bearer ${token}`) : req;
  };

  it('revokes only the current session; the token stops working and logout is not repeatable', async () => {
    const a = (await login({ email: users.active, password })).body.accessToken;
    const b = (await login({ email: users.active, password })).body.accessToken;
    const out = await logout(a);
    expect(out.status).toBe(204);
    expect(out.text).toBe('');
    expect((await me(a)).status).toBe(401);
    expect((await logout(a)).status).toBe(401);
    expect((await me(b)).status).toBe(200); // other session (e.g. another device) unaffected
  });

  it('returns 401 without a token or with a forged one', async () => {
    expect((await logout()).status).toBe(401);
    expect((await logout('forged.token.value')).body.code).toBe('UNAUTHENTICATED');
  });

  it('rejects a session once the account is deactivated', async () => {
    const token = (await login({ email: users.active, password })).body.accessToken;
    await database.query("UPDATE bo_users SET status = 'deactivated' WHERE email = $1", [users.active]);
    try {
      expect((await me(token)).status).toBe(401);
    } finally {
      await database.query("UPDATE bo_users SET status = 'active' WHERE email = $1", [users.active]);
    }
  });
});

describe('password recovery', () => {
  const genericMessage = 'If an active account exists for this email, we have sent a link to reset the password. The link is valid for 30 minutes.';
  const forgot = (email: string) => request(app).post('/backoffice/auth/password/forgot').send({ email });
  const reset = (token: string, newPassword: string) => request(app).post('/backoffice/auth/password/reset').send({ token, password: newPassword });
  const newPassword = 'Brand-New-Pass1';

  /** Requests a link and waits for the (post-response) e-mail, returning the token from it. */
  async function requestToken(email: string) {
    const before = sentEmails.length;
    const res = await forgot(email);
    expect(res.status).toBe(200);
    await vi.waitFor(() => expect(sentEmails.length).toBe(before + 1));
    const email_ = sentEmails[sentEmails.length - 1];
    expect(email_.to).toBe(email);
    return new URL(email_.text.match(/https?:\/\/\S+/)![0]).searchParams.get('token')!;
  }

  it('answers the same for unknown, invited and deactivated emails and sends nothing', async () => {
    const before = sentEmails.length;
    for (const email of ['nobody@shebloom.test', users.invited, users.deactivated]) {
      const res = await forgot(email);
      expect(res.status).toBe(200);
      expect(res.body.message).toBe(genericMessage);
    }
    await new Promise((r) => setTimeout(r, 200));
    expect(sentEmails.length).toBe(before);
    expect((await forgot('not-an-email')).status).toBe(400);
  });

  it('resets the password with the e-mailed link, signs out every session, and burns the link', async () => {
    const oldSession = (await login({ email: users.reset, password })).body.accessToken;
    const token = await requestToken(users.reset);

    const weak = await reset(token, 'short');
    expect(weak.status).toBe(400);
    expect(weak.body.fields.password).toMatch(/10 characters.*uppercase.*number.*special/);

    expect((await reset(token, newPassword)).status).toBe(200);
    expect((await request(app).get('/backoffice/auth/me').set('Authorization', `Bearer ${oldSession}`)).status).toBe(401);
    expect((await login({ email: users.reset, password })).status).toBe(401);
    expect((await login({ email: users.reset, password: newPassword })).status).toBe(200);

    const reused = await reset(token, 'Another-Pass99');
    expect(reused.status).toBe(400);
    expect(reused.body.code).toBe('RESET_LINK_INVALID');
  });

  it('a newer link cancels the older one; expired and forged links are rejected', async () => {
    const first = await requestToken(users.reset);
    const second = await requestToken(users.reset);
    expect((await reset(first, 'Another-Pass99')).body.code).toBe('RESET_LINK_INVALID');

    await database.query(
      "UPDATE bo_password_resets SET expires_at = now() - interval '1 second' WHERE bo_user_id = (SELECT id FROM bo_users WHERE email = $1)",
      [users.reset],
    );
    expect((await reset(second, 'Another-Pass99')).body.code).toBe('RESET_LINK_INVALID');
    expect((await reset('forged-token', 'Another-Pass99')).body.code).toBe('RESET_LINK_INVALID');
    expect((await reset('', 'Another-Pass99')).body.fields).toHaveProperty('token');
  });

  it('never stores the raw token', async () => {
    const token = await requestToken(users.reset);
    const { rows } = await database.query('SELECT 1 FROM bo_password_resets WHERE token_hash = $1', [token]);
    expect(rows).toHaveLength(0);
  });
});

describe('superadmin seed', () => {
  it('exists exactly once and is an Admin', async () => {
    const { rows } = await database.query('SELECT is_admin, is_mentor, status FROM bo_users WHERE is_super_admin');
    expect(rows).toEqual([{ is_admin: true, is_mentor: false, status: 'active' }]);
  });

  it('cannot be a second superadmin, and Mentor stays exclusive', async () => {
    await expect(database.query("INSERT INTO bo_users (email, full_name, is_admin, is_super_admin) VALUES ('e2e.super2@shebloom.test', 'x', true, true)")).rejects.toThrow();
    await expect(database.query("INSERT INTO bo_users (email, full_name, is_admin, is_mentor) VALUES ('e2e.mix@shebloom.test', 'x', true, true)")).rejects.toThrow();
  });
});
