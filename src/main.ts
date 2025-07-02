import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { RpcCustomExceptionFilter } from './common';

async function bootstrap() {
  const logger = new Logger('Main-Getway');

  const app = await NestFactory.create(AppModule);
  // const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new RpcCustomExceptionFilter());

  await app.listen(envs.PORT ?? 3000);
  console.log("Hola Mundo - segundo cambio");
  // await app.listen(process.env.PORT ?? 3000);

  logger.log(`Application is running on: ${envs.PORT ?? 3000}`);
}
bootstrap();
