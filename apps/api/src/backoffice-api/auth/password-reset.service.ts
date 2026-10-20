import { createHash, randomBytes } from 'node:crypto';
import { database } from '../../database/database.js';
import { hashPassword } from '../../common/password.js';
import { sendEmail } from '../../common/mailer.js';

const linkLifetimeMinutes = 30; // "valid for 30 minutes" (design, Access frame "Recover your password")
const resetUrl = process.env.BACKOFFICE_RESET_PASSWORD_URL ?? 'http://localhost:5173/?screen=reset-password';
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');

/** Backoffice password rules from the design (Set password frame): ≥10 chars, uppercase, number, special char. */
export function passwordProblems(password: string) {
  const problems: string[] = [];
  if (password.length < 10) problems.push('at least 10 characters');
  if (!/[A-Z]/.test(password)) problems.push('one uppercase letter');
  if (!/[0-9]/.test(password)) problems.push('one number');
  if (!/[^A-Za-z0-9]/.test(password)) problems.push('one special character');
  return problems;
}

const fallbackTemplate = {
  it: { subject: 'Reimposta la tua password She Bloom', body: 'Ciao {{name}},\n\nusa questo link per impostare una nuova password (valido 30 minuti):\n{{link}}\n\nSe non hai richiesto il reset, ignora questa e-mail.' },
  en: { subject: 'Reset your She Bloom password', body: 'Hi {{name}},\n\nuse this link to set a new password (valid for 30 minutes):\n{{link}}\n\nIf you did not request a reset, ignore this e-mail.' },
};

/** Text editable by the Admin in comm_templates (RF-BO-CMS-09); built-in text until a row exists. */
async function resetEmailTemplate(language: 'it' | 'en') {
  const { rows } = await database.query<{ subject: Record<string, string> | null; body: Record<string, string> }>(
    "SELECT subject, body FROM comm_templates WHERE event = 'bo_password_reset' AND channel = 'email'",
  );
  const fallback = fallbackTemplate[language];
  return { subject: rows[0]?.subject?.[language] ?? fallback.subject, body: rows[0]?.body?.[language] ?? fallback.body };
}

/** Runs after the HTTP response has been sent: callers must not learn whether the e-mail exists. */
export async function requestPasswordReset(email: string) {
  const { rows } = await database.query<{ id: string; full_name: string; language: 'it' | 'en' }>(
    "SELECT id, full_name, language FROM bo_users WHERE lower(email) = $1 AND status = 'active'",
    [email],
  );
  const user = rows[0];
  if (!user) return; // unknown, invited (uses the invitation link) or deactivated: no e-mail

  const token = randomBytes(32).toString('base64url');
  // Only the newest link works: older unused ones are cancelled.
  await database.query('UPDATE bo_password_resets SET used_at = now() WHERE bo_user_id = $1 AND used_at IS NULL', [user.id]);
  await database.query(
    'INSERT INTO bo_password_resets (bo_user_id, token_hash, expires_at) VALUES ($1, $2, now() + make_interval(mins => $3))',
    [user.id, sha256(token), linkLifetimeMinutes],
  );

  const link = new URL(resetUrl);
  link.searchParams.set('token', token);
  const template = await resetEmailTemplate(user.language);
  const fill = (text: string) => text.replaceAll('{{name}}', user.full_name).replaceAll('{{link}}', link.toString());
  await sendEmail({ to: email, subject: fill(template.subject), text: fill(template.body) });
}

/** Sets the new password and signs the user out everywhere. Returns false if the link is unknown, used, expired or the user is no longer active. */
export async function resetPassword(token: string, password: string) {
  const client = await database.connect();
  try {
    await client.query('BEGIN');
    // FOR UPDATE: two concurrent submits of the same link can't both succeed.
    const { rows } = await client.query<{ id: string; bo_user_id: string }>(
      `SELECT r.id, r.bo_user_id FROM bo_password_resets r JOIN bo_users u ON u.id = r.bo_user_id
       WHERE r.token_hash = $1 AND r.used_at IS NULL AND r.expires_at > now() AND u.status = 'active'
       FOR UPDATE OF r`,
      [sha256(token)],
    );
    const reset = rows[0];
    if (!reset) {
      await client.query('ROLLBACK');
      return false;
    }
    await client.query('UPDATE bo_users SET password_hash = $1, updated_at = now() WHERE id = $2', [await hashPassword(password), reset.bo_user_id]);
    await client.query('UPDATE bo_password_resets SET used_at = now() WHERE id = $1', [reset.id]);
    await client.query('UPDATE bo_sessions SET revoked_at = now() WHERE bo_user_id = $1 AND revoked_at IS NULL', [reset.bo_user_id]);
    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
