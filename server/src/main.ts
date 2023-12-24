import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { allowedOrigin } from './constants';
import env from './lib/env';

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [allowedOrigin],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
  app.use((req, res, next) => {
    logger.log('Headers:', req.headers);
    next();
  });
  await app.listen(env.PORT, '0.0.0.0');
  logger.log("Application listening on port " + env.PORT)
}
bootstrap();
