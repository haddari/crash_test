import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  // Indique que l'application est de type NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  mongoose.set('strictPopulate', false);

  const config = new DocumentBuilder()
    .setTitle('Crash Test')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('your-tag') // Optional
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Configure static assets to serve files
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', // Add a prefix for accessing files
  });

  await app.listen(3000, "172.20.10.3");
}
bootstrap();
