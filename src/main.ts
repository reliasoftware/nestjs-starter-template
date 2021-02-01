import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('App');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // swagger's config
  const config = new DocumentBuilder()
    .setTitle('Renfi')
    .setDescription('renfi api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => logger.log(`http://localhost:${PORT}`));
}
bootstrap();
