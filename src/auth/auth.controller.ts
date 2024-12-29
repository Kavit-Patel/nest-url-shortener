import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GoogleGuard } from './google.guard';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { GoogleUserDto } from './dto/google-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService){}

  @ApiOperation({ summary: 'Redirect to Google for authentication' })
  @ApiResponse({ status: 302, description: 'Redirects the user to Google login' })
  @Get('google')
  @UseGuards(GoogleGuard)
  googleLogin() {
  }

  @ApiOperation({ summary: 'Handle Google callback after login' })
  @ApiResponse({ status: 302, description: 'Redirects to the frontend URL upon successful authentication' })
  @ApiResponse({ status: 500, description: 'Error during Google authentication' })
  @Get('google/callback')
  @UseGuards(GoogleGuard)
  googleCallback(@Req() req, @Res() res) {
    const user = req.user
    console.log(user.email)
    if(!user){
      throw new Error("User isn't present in google authentication callback")
    }
    res.redirect(`${process.env.FRONTEND_URL}`)
  }

  @ApiOperation({ summary: 'Get the currently logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the authenticated user',
    type: GoogleUserDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized, no user logged in' })
  @Get('user')
  @ApiSecurity('connect.sid')
  loginUser(@Req() req){
    const user = req.user
    if(!user){
      throw new UnauthorizedException()
    }
    return user
  }

  @ApiOperation({ summary: 'Logout the current user' })
  @ApiResponse({ status: 200, description: 'Successfully logged out' })
  @Get('logout')
  logout(@Req() req, @Res() res) {
    res.clearCookie('connect.sid'); 
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destroy error:', err);
      }
      res.redirect('/');
    });
  }
}
