import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("Listening on port", process.env.NODE_PORT);
  await app.listen(3001);
  
}
bootstrap();
