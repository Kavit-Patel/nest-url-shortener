import {  Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { extractDevice, extractOS, generateMeaningfulAlias, generateTopic } from './url.utils';
import { randomUUID } from 'crypto';

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

  async redirectToLongUrl(alias:string,ip:string,userAgent:string){
    const url = await this.prisma.url.findUnique({where:{alias}})
    if(!url){
      throw new NotFoundException()
    }
    const osName = extractOS(userAgent);
    const deviceName = extractDevice(userAgent);


    const exixtingClick = await this.prisma.click.findUnique({
      where:{
        ipAddress_userAgent_urlId:{
          ipAddress:ip,
          userAgent,
          urlId:url.id
        }
      }
    })


    if(!exixtingClick){
      await this.prisma.click.create({
        data:{
          urlId:url.id,
          ipAddress:ip,
          userAgent
        }
      })
    }
      await this.prisma.analytics.upsert({
        where:{urlId_osName_deviceName:{urlId:url.id,osName,deviceName}},
        update:{uniqueVisits:{increment:1},lastAccessed:new Date()},
        create:{
          urlId:url.id,
          uniqueVisits:1,
          clicks:1,
          lastAccessed:new Date(),
          osName,
          deviceName
        }
      })

    return `${url.longUrl}`
  }

}
