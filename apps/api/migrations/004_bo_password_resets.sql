-- One-time password recovery links for backoffice users (RF-BO-ACC-04). Only a SHA-256 of the token is stored.
CREATE TABLE IF NOT EXISTS bo_password_resets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bo_user_id UUID NOT NULL REFERENCES bo_users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS bo_password_resets_bo_user_id_idx ON bo_password_resets (bo_user_id);
