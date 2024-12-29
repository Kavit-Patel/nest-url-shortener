import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { SessionSerializer } from './session.serializer';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PassportModule.register({session:true}),PrismaModule],
  providers: [AuthService,GoogleStrategy,SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule {}
