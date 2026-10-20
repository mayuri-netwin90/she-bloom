export type Role = 'ADMIN' | 'MODERATOR' | 'MENTOR';
type AdminUser = {
    id: string;
    email: string;
    full_name: string;
    password_hash: string | null;
    is_admin: boolean;
    is_moderator: boolean;
    is_mentor: boolean;
    is_super_admin: boolean;
    status: 'invited' | 'active' | 'deactivated';
    language: string;
};
declare const publicUser: (user: AdminUser) => {
    id: string;
    email: string;
    name: string;
    roles: Role[];
    isSuperAdmin: boolean;
    language: string;
};
export type LoginResult = {
    ok: true;
    accessToken: string;
    expiresIn: number;
    user: ReturnType<typeof publicUser>;
} | {
    ok: false;
    reason: 'INVALID_CREDENTIALS' | 'ACCOUNT_DEACTIVATED';
};
export declare function login(email: string, password: string, rememberMe?: boolean): Promise<LoginResult>;
/** Valid signature alone isn't enough: the session must exist, be unrevoked and unexpired, and the user still active. */
export declare function authenticate(token?: string): Promise<{
    sessionId: string;
    user: {
        id: string;
        email: string;
        name: string;
        roles: Role[];
        isSuperAdmin: boolean;
        language: string;
    };
} | null>;
export declare function logout(sessionId: string): Promise<void>;
export {};
