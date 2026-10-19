export type BackofficeUser = {
    id: string;
    email: string;
    name: string;
    role: string;
    is_active: boolean;
    last_login_at: Date | null;
    created_at: Date;
    updated_at: Date;
};
export declare function listBackofficeUsers(): Promise<BackofficeUser[]>;
