import { Pool } from 'pg';
export declare const database: Pool;
export declare function initializeDatabase(): Promise<void>;
