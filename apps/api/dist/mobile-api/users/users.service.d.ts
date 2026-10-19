export type MobileUser = {
    id: string;
    email: string;
    name: string;
    is_active: boolean;
    last_login_at: Date | null;
    created_at: Date;
    updated_at: Date;
};
export type UpdateMobileUserInput = {
    name?: string;
};
export declare function getMobileUserById(id: string): Promise<MobileUser | null>;
export declare function updateMobileUser(id: string, input: UpdateMobileUserInput): Promise<MobileUser>;
