
import {
    Body,
    Controller,
    Get,
    Headers,
    Ip,
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
import { ApiHeader, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
  
  @Controller()
  export class UrlsController { 
    constructor(private readonly urlService: UrlService) {}
  
    @UseGuards(LoggedInGuard)
    @Post('shorten')
    @ApiOperation({ summary: 'Create a short URL for a given long URL.' })
  @ApiResponse({
    status: 201,
    description: 'Short URL successfully created.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized if the user is not logged in.',
  })
    async createShortUrl(@Req() req,@Body() createUrlDto: CreateUrlDto) {
      const sessionUser = req.user?.id
      if(!sessionUser){
         throw new UnauthorizedException("You are not authorized !")
      }
      return this.urlService.createShortUrl(sessionUser,createUrlDto);
    }
  
    @Get(':alias')
    @Redirect()
    @ApiOperation({ summary: 'Redirect to the original long URL using the alias.' })
  @ApiParam({
    name: 'alias',
    required: true,
    description: 'The alias for the short URL.',
    example: 'google',
  })
  @ApiHeader({
    name: 'user-agent',
    description: 'The User-Agent header of the client making the request.',
    required: false,
  })
  @ApiResponse({
    status: 302,
    description: 'Redirects to the long URL.',
  })
  @ApiResponse({
    status: 404,
    description: 'Alias not found or invalid.',
  })
    async redirectToLongUrl(@Req() req,@Param('alias') alias: string,@Ip() ip:string,@Headers('user-agent') userAgent:string|undefined) {
      if(ip==="::1" || ip.includes("ffff")){
        ip = "127.0.0.1"
      }
      const lognUrl = await this.urlService.redirectToLongUrl(alias,ip,userAgent||"unknown");
      return {url:lognUrl,statusCode:302}
    }
  }
  