import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { GoogleUserDto } from './dto/google-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateOrCreateUser(userDto: GoogleUserDto): Promise<any> {
    const existingUser = await this.usersService.findOneByGoogleId(
      userDto.googleId,
    );
    if (existingUser) {
      return existingUser;
    } else {
      const newUser = await this.usersService.createUser(userDto);
      return newUser;
    }
  }

  async validateGoogleUser(profile: GoogleUserDto): Promise<any> {
    const { googleId, email, name } = profile;
    let user = await this.usersService.findByEmail(email);
    if (!user) {
      user = await this.usersService.createUser({ googleId, email, name });
    }
    return user;
  }

  async validateLocalUser(email: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      return user;
    }
    return null;
  }
}
