import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // app.enableCors({
  //   origin: 'http://localhost:4000', // 사용하고자 하는 특정 출처
  //   methods: 'GET,PUT,POST,DELETE',
  //   allowedHeaders: 'Content-Type, Authorization',
  // });
  app.enableCors();
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
