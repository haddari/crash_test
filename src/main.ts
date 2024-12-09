import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import mongoose from 'mongoose';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend integration
  app.enableCors();

  // Enable global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Automatically strip unknown properties
    forbidNonWhitelisted: true, // Throw errors for unknown properties
    transform: true, // Automatically transform payloads to DTO instances
  }));

  // Set Mongoose options
  mongoose.set('strictPopulate', false);

  // Swagger setup for API documentation
  const config = new DocumentBuilder()
    .setTitle('Crash Test API')
    .setDescription('API documentation for the Crash Test application')
    .setVersion('1.0')
    .addBearerAuth() // Add JWT authentication to Swagger
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI available at /api

  // Start the server
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Application is running on: http://localhost:${PORT}`);
}
bootstrap();
