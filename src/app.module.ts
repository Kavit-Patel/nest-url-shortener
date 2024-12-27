import {  Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UrlModule } from './url/url.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true}),AuthModule, UsersModule,PrismaModule,UrlModule,AnalyticsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
