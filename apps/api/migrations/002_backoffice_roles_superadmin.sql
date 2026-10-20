-- bo_users already carries roles (is_admin/is_moderator/is_mentor), status and totp_enabled.
-- Adds local password storage and the protected superadmin flag (RF-BO-ACC-02, RF-BO-ACC-07).
ALTER TABLE bo_users ADD COLUMN IF NOT EXISTS password_hash TEXT; -- NULL while invited (RF-BO-ACC-01)
ALTER TABLE bo_users ADD COLUMN IF NOT EXISTS is_super_admin BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE bo_users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'bo_users_super_admin_is_admin') THEN
    ALTER TABLE bo_users ADD CONSTRAINT bo_users_super_admin_is_admin CHECK (NOT is_super_admin OR is_admin);
  END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS bo_users_one_super_admin ON bo_users (is_super_admin) WHERE is_super_admin;
