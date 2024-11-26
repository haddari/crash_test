import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  mongoose.set('strictPopulate', false);
  const config = new DocumentBuilder()
    .setTitle('Crash Test')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('your-tag') // Optional
    .build();
    const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();    