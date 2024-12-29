import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { GoogleUserDto } from './dto/google-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly prisma: PrismaService){
        super()
    }

    serializeUser(user: GoogleUserDto, done: (err: Error, user: any) => void){
        done(null, user)
    }

    async deserializeUser(user: GoogleUserDto, done: (err: Error, user: any) => void){
        const userDb = await this.prisma.user.findUnique({
            where: { googleId:user.googleId },include:{urls:true},
          });
        return done(null, userDb)
    }
}

