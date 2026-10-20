-- Server-side backoffice sessions: each access token carries its session id (sid), so logout can revoke it (RF-BO-ACC-05).
CREATE TABLE IF NOT EXISTS bo_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bo_user_id UUID NOT NULL REFERENCES bo_users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  revoked_at TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS bo_sessions_bo_user_id_idx ON bo_sessions (bo_user_id);
