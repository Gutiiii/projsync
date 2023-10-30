import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(process.env.PORT, '0.0.0.0');
  logger.log("Application listening on port " + process.env.PORT)
}
bootstrap();
