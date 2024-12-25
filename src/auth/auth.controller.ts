import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './google.guard';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin() {
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleCallback(@Req() req, @Res() res) {
    res.redirect('/');
  }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      res.redirect('/');
    });
  }
}
