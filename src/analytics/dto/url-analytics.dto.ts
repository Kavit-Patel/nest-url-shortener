export class UrlAnalyticsDto {
    alias: string;
    totalClicks: number;
    uniqueClicks: number;
    clicksByDate: Array<{ date: string; count: number }>;
    osType: Array<{ osName: string; uniqueClicks: number; uniqueUsers: number }>;
    deviceType: Array<{
      deviceName: string;
      uniqueClicks: number;
      uniqueUsers: number;
    }>;
  }