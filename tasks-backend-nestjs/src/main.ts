import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

// Cargar variables de entorno al inicio
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');
  
  // Configurar CORS nativo de NestJS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });
  
  // Obtener configuración
  const port = configService.get<number>('port') || 4000;
  const environment = configService.get<string>('environment') || 'development';
  
  // Iniciar la aplicación
  await app.listen(port);
  
  logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
  logger.log(`🌍 Environment: ${environment}`);
  logger.log(`📝 Auth endpoints: ${await app.getUrl()}/auth/*`);
  logger.log(`📝 Tasks endpoints: ${await app.getUrl()}/tareas/*`);
}

bootstrap().catch((error) => {
  console.error('Error starting the application:', error);
  process.exit(1);
});
