import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { ZodValidationPipe } from 'nestjs-zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LogModule } from './log/log.module';
import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';
import { EventsService } from './events/events.service';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, ProjectModule, EventsModule, LogModule, ThrottlerModule.forRoot([{
    ttl: 30000,
    limit: 20,
  }]), LogModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  }, PrismaService, EventsService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule { }
