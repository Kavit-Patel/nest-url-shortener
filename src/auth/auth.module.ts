import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { SessionSerializer } from './session.serializer';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[UsersModule,PassportModule.register({session:true}),PrismaModule],
  providers: [UsersService,AuthService,GoogleStrategy,SessionSerializer],
  controllers: [AuthController]
})
export class AuthModule {}
