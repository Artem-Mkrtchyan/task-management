export {};

declare global {
    declare namespace NodeJS {
        export interface ProcessEnv {
            PORT: number;
            DB_NAME: string;
            DB_USERNAME: string;
            DB_PASSWORD: string;
            DB_HOST: string;
            DB_PORT: number
            JWT_ACCESS_SECRET: string;
            JWT_REFRESH_SECRET: string;
            SMTP_HOST: string;
            SMTP_PORT: string;
            SMTP_USER: string;
            SMTP_PASSWORD: string;
            API_URL: string;
            CLIENT_URL: string;
        }
    }
}