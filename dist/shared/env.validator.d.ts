declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}
declare class EnvVariables {
    NODE_ENV: Environment;
    PORT: number;
    DB_TYPE: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_ENTITIES: string;
    DB_MIGRATIONS: string;
    JWT_SECRET: string;
    JWT_TIMEFRAME: string;
    INVITE_SECRET: string;
    INVITE_DURATION: string;
}
export declare function validateEnv(config: Record<string, unknown>): EnvVariables;
export {};
