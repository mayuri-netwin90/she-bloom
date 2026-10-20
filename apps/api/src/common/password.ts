import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);

export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const key = (await scrypt(password, salt, 64)) as Buffer;
  return `${salt}:${key.toString('hex')}`;
}

// Hash used when the user has no password, so response time doesn't reveal whether the email exists.
const dummyHash = hashPassword('timing-equaliser');

export async function verifyPassword(password: string, stored: string | null) {
  const [salt, hash] = (stored ?? (await dummyHash)).split(':');
  if (!salt || !hash) return false;
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const known = Buffer.from(hash, 'hex');
  return stored !== null && derived.length === known.length && timingSafeEqual(derived, known);
}
