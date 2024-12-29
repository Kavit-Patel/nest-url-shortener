import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UrlAnalyticsResponseDto } from './dto/url-analytics.dto';


@ApiTags()
@Controller()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('analytics/:alias')
  @ApiOperation({ summary: 'Get analytics for a specific URL alias' })
  @ApiParam({
    name: 'alias',
    description: 'Alias of the URL for which analytics are required',
    example: 'short-url-alias',
  })
  @ApiResponse({
    status: 200,
    description: 'URL analytics data',
    type: UrlAnalyticsResponseDto,
  })
  async getUrlAnalytics(@Param('alias') alias: string) {
    return this.analyticsService.getUrlAnalytics(alias);
  }

  @Get('analytics/topic/:topic')
  @ApiOperation({ summary: 'Get analytics for a specific topic' })
  @ApiParam({
    name: 'topic',
    description: 'Topic name for which analytics are required',
    example: 'search-engine / retention',
  })
  @ApiResponse({
    status: 200,
    description: 'Topic analytics data',
  })
  async getTopicAnalytics(@Param('topic') topic: string) {
    return this.analyticsService.getTopicAnalytics(topic);
  }
  @Get('api/overall/')
  @ApiOperation({ summary: 'Get overall analytics across all data' })
  @ApiResponse({
    status: 200,
    description: 'Overall analytics data',
  })
  async getOverallAnalytics() {
    return this.analyticsService.getOverallAnalytics();
  }
}