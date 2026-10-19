export declare function login(email: string, password: string): Promise<{
    accessToken: string;
    expiresIn: number;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
} | null>;
export declare function authenticatedUser(token?: string): Promise<{
    id: string;
    email: string;
    name: string;
    role: string;
} | null>;
