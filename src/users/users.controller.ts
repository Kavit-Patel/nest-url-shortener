import { Controller, Get, Req } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('dashboard')
  getProfile(@Req() req) {
    return req.user; 
  }
}
