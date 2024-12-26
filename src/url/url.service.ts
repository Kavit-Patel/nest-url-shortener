import {  Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { generateMeaningfulAlias, generateTopic } from './url.utils';
import { randomUUID } from 'crypto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  async createShortUrl(userId:string,data: CreateUrlDto) {
    const {longUrl,customAlias,topic}=data;
    const existsLongUrl = await this.prisma.url.findFirst({where:{longUrl,userId}})
    if(existsLongUrl){
      return {shortUrl:`${process.env.BASE_URL}/${existsLongUrl.alias}`,createdAt:existsLongUrl.createdAt}
    }
    const existingTopic = topic && await this.prisma.user.findFirst({where:{id:userId,urls:{some:{topic:{name:topic}}}},select:{urls:{select:{topic:{select:{id:true}}}}}})
    const topicId = existingTopic? existingTopic.urls[0]?.topic?.id: (await this.prisma.topic.create({data:{name:topic?topic:generateTopic()}})).id;
    const newUrl = await this.prisma.url.create({
      data: {
        longUrl,
        shortUrl:randomUUID().slice(0,5),
        alias:customAlias || await generateMeaningfulAlias(longUrl,userId),
        userId,
        topicId,
      },
      include: {
         topic: true ,
      },
    });
    return {
      shortUrl:`${process.env.BASE_URL}/${newUrl.alias}`,
      createdAt:newUrl.createdAt,
    }
  }

  async redirectToLongUrl(userId:string,alias:string){
    const url = await this.prisma.url.findUnique({where:{alias,userId}})
    if(!url){
      throw new NotFoundException()
    }
    return `${url.longUrl}`
  }

}
