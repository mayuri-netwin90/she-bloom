export declare function mobileLogin(email: string, password: string): Promise<{
    accessToken: string;
    expiresIn: number;
    user: {
        id: string;
        email: string;
        name: string;
    };
} | null>;
export declare function currentMobileUser(token?: string): Promise<{
    id: string;
    email: string;
    name: string;
} | null>;
