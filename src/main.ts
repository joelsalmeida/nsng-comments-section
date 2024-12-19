import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerDocumentConfig = new DocumentBuilder()
    .setTitle('NSNG Comments Section API')
    .setDescription('The NSNG Comments Section API description')
    .setVersion('1.0')
    .addTag('nsng')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    swaggerDocumentConfig,
  );

  SwaggerModule.setup('api', app, swaggerDocument);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(3000);
}

bootstrap();
