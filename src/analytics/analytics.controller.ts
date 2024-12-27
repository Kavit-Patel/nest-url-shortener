import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AuthGuard } from '@nestjs/passport';


@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('analytics/:alias')
  async getUrlAnalytics(@Param('alias') alias: string) {
    return this.analyticsService.getUrlAnalytics(alias);
  }

  @Get('analytics/topic/:topic')
  async getTopicAnalytics(@Param('topic') topic: string) {
    return this.analyticsService.getTopicAnalytics(topic);
  }
  @Get('api/overall/')
  async getOverallAnalytics() {
    return this.analyticsService.getOverallAnalytics();
  }
}