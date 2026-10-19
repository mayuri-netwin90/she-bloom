export declare function login(email: string, password: string): Promise<{
    accessToken: string;
    expiresIn: number;
    user: {
        id: string;
        email: string;
        name: string;
    };
} | null>;
export declare function currentUser(token?: string): Promise<{
    id: string;
    email: string;
    name: string;
} | null>;
