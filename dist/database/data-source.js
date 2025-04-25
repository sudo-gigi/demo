"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDataSource = initializeDataSource;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const path = require("path");
(0, dotenv_1.config)({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });
const dataSource = new typeorm_1.DataSource({
    type: process.env.DB_TYPE || 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    entities: [path.join(__dirname, '../modules/**/*.model.{ts,js}')],
    migrations: [path.join(__dirname, './migrations/*.{ts,js}')],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    synchronize: false,
    migrationsTableName: 'migrations',
    ssl: process.env.DB_SSL === 'true',
});
async function initializeDataSource() {
    if (!dataSource.isInitialized) {
        await dataSource.initialize();
    }
    return dataSource;
}
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map