export type BackofficeUser = {
    id: string;
    email: string;
    full_name: string;
    is_admin: boolean;
    is_moderator: boolean;
    is_mentor: boolean;
    is_super_admin: boolean;
    status: string;
    last_login_at: Date | null;
    created_at: Date;
};
export declare function listBackofficeUsers(): Promise<BackofficeUser[]>;
