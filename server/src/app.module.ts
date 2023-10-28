import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

import { ProjectModule } from './project/project.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, ProjectModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_PIPE,
    useClass: ZodValidationPipe,
  }
  ],
})
export class AppModule { }
