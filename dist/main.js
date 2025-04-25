"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const data_source_1 = require("./database/data-source");
const validator_pipe_1 = require("./shared/validator.pipe");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const validation_exception_filter_1 = require("./shared/validation-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const logger = new common_1.Logger('Bootstrap');
    try {
        await (0, data_source_1.initializeDataSource)();
        logger.log('Data Source has been initialized!');
    }
    catch (err) {
        console.error('Error during Data Source initialization', err);
        process.exit(1);
    }
    app.enable('trust proxy');
    app.enableCors();
    app.setGlobalPrefix('api/');
    app.useGlobalPipes(new validator_pipe_1.ValidationPipe());
    app.useGlobalFilters(new validation_exception_filter_1.ValidationExceptionFilter());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('GamEd API Documentation')
        .setDescription('GamEd API Documentation')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, documentFactory);
    const port = process.env.PORT ?? 5001;
    await app.listen(port);
    logger.log(`Application is running on port ${port}`);
    logger.log({
        message: 'Server started 🚀',
        port,
        url: `http://localhost:${port}/api/`,
    });
}
bootstrap().catch((err) => {
    console.error('Failed to start application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map