
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Redirect,
    Req,
    UnauthorizedException,
    UseGuards,
  } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';
import { LoggedInGuard } from 'src/auth/logged-in.auth.guard';
  
  @Controller()
  export class UrlsController { 
    constructor(private readonly urlService: UrlService) {}
  
    @UseGuards(LoggedInGuard)
    @Post('shorten')
    async createShortUrl(@Req() req,@Body() createUrlDto: CreateUrlDto) {
      const sessionUser = req.user?.id
      if(!sessionUser){
         throw new UnauthorizedException("You are not authorized !")
      }
      return this.urlService.createShortUrl(sessionUser,createUrlDto);
    }
  
    @Get(':alias')
    @Redirect()
    async redirectToLongUrl(@Req() req,@Param('alias') alias: string) {
      const sessionUser = req.user?.id
      if(!sessionUser){
         throw new UnauthorizedException("You are not authorized !")
      }
      const lognUrl = await this.urlService.redirectToLongUrl(sessionUser,alias);
      return {url:lognUrl,statusCode:302}
    }
  }
  