import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

var bodyParser = require('body-parser');

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
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
  await app.listen(process.env.BACKEND_PORT);
}
bootstrap();