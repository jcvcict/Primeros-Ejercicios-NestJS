import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:4200',  // Especifica el origen permitido
    methods: 'GET,POST,PUT,DELETE',   // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
  });

 
  app.use(cookieParser());
  
 



  await app.listen(3000);
}
bootstrap();
