import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;

  app.enableCors({
    origin: 'http://localhost:5173',
  });
  await app.listen(process.env.PORT ?? port);
  console.log('App running at ' ,port)
}
bootstrap();
