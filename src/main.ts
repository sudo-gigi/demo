import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DataSource } from 'typeorm';
import { initializeDataSource } from './database/data-source';
import { ValidationPipe } from './shared/validator.pipe';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationExceptionFilter } from './shared/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const logger = new Logger('Bootstrap');


  try {
    await initializeDataSource();
    logger.log('Data Source has been initialized!');
  } catch (err) {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  }
  app.enable('trust proxy');
  app.enableCors();
  app.setGlobalPrefix('api/');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('GamEd API Documentation')
    .setDescription('GamEd API Documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);

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
