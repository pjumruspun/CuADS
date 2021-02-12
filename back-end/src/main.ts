import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Config
  const config = new DocumentBuilder()
  .setTitle('Projects Example')
  .setDescription('How to use API')
  .setVersion('0.0.1')
  .build();

  // Swagger Setup
  const document = SwaggerModule.createDocument(app, config);

  // Access Swagger with 'localhost:port/api' route
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();