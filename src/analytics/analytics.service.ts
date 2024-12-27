import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { extractDevice, extractOS } from 'src/url/url.utils';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUrlAnalytics(alias: string) {
    const url = await this.prisma.url.findUnique({
      where: { alias },
      include: { analytics: true,clicks:true },
    });
    if (!url) {
      throw new NotFoundException();
    }
    const totalClicks = url.analytics?.reduce((prev,curr)=>prev+curr.clicks,0)
    const uniqueClicks= new Set(url.clicks.map(click=>click.ipAddress)).size ||0;
    const recent7DaysStats = Array.from({length:7}).map((_,idx)=>{
      const today = new Date();
      today.setDate(today.getDate()-idx);
      return {
        date:today.toISOString().split('T')[0],
        clickCount:url.clicks.filter(click=>new Date(click.createdAt).toISOString().split('T')[0]===today.toISOString().split('T')[0]).length
      }
    });
    const [osType,deviceType] = url.analytics.map(analytic=>{
      const osName = analytic.osName
      const deviceName = analytic.deviceName
      return [{
        osName,
        uniqueClicks:url.analytics.reduce((prev,curr)=>curr.osName===osName?prev+curr.uniqueVisits:prev,0)||0,
        uniqueUsers:url.clicks.filter(click=>extractOS(click.userAgent)===osName).length||0
      },{
        deviceName,
        uniqueClicks:url.analytics.reduce((prev,curr)=>curr.deviceName===deviceName?prev+curr.clicks:prev,0)||0,
        uniqueUsers:url.clicks.filter(click=>extractDevice(click.userAgent)===deviceName).length||0
      }]
    })

    return {
      totalClicks,uniqueUser:uniqueClicks,clicksByDate:recent7DaysStats,osType,deviceType
    }

  }

  async getTopicAnalytics(topic: string) {
    const topicUrls = await this.prisma.topic.findMany({where:{name:topic},include:{urls:{include:{analytics:true,clicks:true}}}});
    if(topicUrls.length===0){
      throw new NotFoundException()
    }
    const urls = topicUrls.flatMap(topic=>topic.urls)
    const totalClicks= urls.flatMap(url=>url.analytics).reduce((prev,curr)=>prev+curr.clicks,0);
    const uniqueUsers= new Set (urls.flatMap(url=>url.clicks).map(click=>click.ipAddress)).size ||0;
    const clicksByDate= Array.from({length:7}).map((_,idx)=>{
      const today = new Date();
      today.setDate(today.getDate()-idx);
      return {
        date:today.toISOString().split('T')[0],
        clickCount:urls.flatMap(url=>url.clicks).filter(click=>click.createdAt.toISOString().split('T')[0]===today.toISOString().split('T')[0]).length
      }
    })
    const urlsStats = urls.map(topic=>{

      const currentShortUrl = topic.shortUrl;
      const totalClicks = topic.analytics.reduce((prev,curr)=>prev+curr.clicks,0)
      const uniqueUsers = new Set(topic.clicks.map(click=>click.ipAddress)).size;
      return {
        shortUrl:currentShortUrl,
        totalClicks,
        uniqueClicks:uniqueUsers
      }
    })
    return {
      totalClicks,uniqueUsers,clicksByDate,urls:urlsStats
    }

  }

  async getOverallAnalytics() {
    
  }
}