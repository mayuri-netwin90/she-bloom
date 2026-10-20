export type Email = { to: string; subject: string; text: string };

// ponytail: no e-mail provider chosen yet (FA ch. 8 "E-mail provider"); logs instead of sending.
// Swap this body for the provider's SDK/SMTP call when one is picked; callers don't change.
export async function sendEmail(email: Email) {
  if (process.env.NODE_ENV === 'production') console.warn(`E-mail provider not configured: e-mail to ${email.to} NOT sent.`);
  else console.log(`[mail] to=${email.to} subject=${email.subject}\n${email.text}`);
}
