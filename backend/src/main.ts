import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.enableCors({
    origin: configService.getOrThrow<string>('FRONTEND_URL') ?? "http://localhost:5173",
    credentials: true,
  });

  const port = configService.getOrThrow<number>('PORT') ?? 3000;

  await app.listen(port);

  console.log(` HireScope API running on port ${port}`);
}

bootstrap();
