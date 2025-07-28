import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TareasModule } from './tareas/tareas.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoutesModule } from './routes/routes.module';
import { OptionsController } from './controllers/options.controller';
import { appConfig } from './config';
import { 
  LoggerMiddleware, 
  SecurityMiddleware,
  RateLimitMiddleware 
} from './common/middlewares';
import { AllExceptionsFilter } from './common/filters';
import { ValidationPipe } from './common/pipes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    CommonModule,
    PrismaModule,
    TareasModule,
    AuthModule,
    RoutesModule,
  ],
  controllers: [AppController, OptionsController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        SecurityMiddleware,
        LoggerMiddleware,
        RateLimitMiddleware,
      )
      .forRoutes('*');
  }
}
