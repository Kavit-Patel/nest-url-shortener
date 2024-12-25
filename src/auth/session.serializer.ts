import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { GoogleUserDto } from './dto/google-user.dto';

@Injectable()
export class SessionSerializer extends PassportSerializer {
    constructor(private readonly userService: UsersService){
        super()
    }

    serializeUser(user: GoogleUserDto, done: (err: Error, user: any) => void){
        done(null, user)
    }

    async deserializeUser(user: GoogleUserDto, done: (err: Error, user: any) => void){
        const userDb = await this.userService.findOneByGoogleId(user.googleId);
        return done(null, userDb)
    }
}

