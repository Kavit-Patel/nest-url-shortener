import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleUserDto } from 'src/auth/dto/google-user.dto';

@Injectable()
export class UsersService {
    constructor(private prisma:PrismaService){}

    async findOneByGoogleId(googleId: string): Promise<any | null> {
        return this.prisma.user.findUnique({
          where: { googleId },
        });
      }
    
      async createUser(userDto: GoogleUserDto): Promise<any> {
        return this.prisma.user.create({
          data: userDto,
        });
      }

    async findByEmail(email:string){
        return this.prisma.user.findUnique({where:{email}});
    }
}
