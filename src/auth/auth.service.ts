import { Injectable } from '@nestjs/common';
import { GoogleUserDto } from './dto/google-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateOrCreateUser(googleUser: GoogleUserDto): Promise<any> {
    const existingUser = await this.prisma.user.findUnique({
      where: { googleId:googleUser.googleId },include:{urls:true},
    });

    if (existingUser) {
      return existingUser;
    } else {
      const newUser = await this.prisma.user.create({
        data: googleUser,include:{urls:true}
      });
      return newUser;
    }
  }

}