import { ApiProperty } from '@nestjs/swagger';

class ClickStatsByDate {
  @ApiProperty({ description: 'Date of the clicks', example: '2024-01-01' })
  date: string;

  @ApiProperty({ description: 'Number of clicks on this date', example: 10 })
  clickCount: number;
}

class OsTypeStats {
  @ApiProperty({ description: 'Operating System Name', example: 'Windows' })
  osName: string;

  @ApiProperty({ description: 'Unique clicks for this OS', example: 25 })
  uniqueClicks: number;

  @ApiProperty({ description: 'Unique users for this OS', example: 15 })
  uniqueUsers: number;
}

class DeviceTypeStats {
  @ApiProperty({ description: 'Device Name', example: 'Mobile' })
  deviceName: string;

  @ApiProperty({ description: 'Unique clicks for this device', example: 30 })
  uniqueClicks: number;

  @ApiProperty({ description: 'Unique users for this device', example: 20 })
  uniqueUsers: number;
}

export class UrlAnalyticsResponseDto {
  @ApiProperty({ description: 'Total clicks for the URL', example: 100 })
  totalClicks: number;

  @ApiProperty({ description: 'Unique users for the URL', example: 50 })
  uniqueUser: number;

  @ApiProperty({
    description: 'Click statistics by date for the last 7 days',
    type: [ClickStatsByDate],
  })
  clicksByDate: ClickStatsByDate[];

  @ApiProperty({
    description: 'Analytics by OS type',
    type: [OsTypeStats],
  })
  osType: OsTypeStats[];

  @ApiProperty({
    description: 'Analytics by device type',
    type: [DeviceTypeStats],
  })
  deviceType: DeviceTypeStats[];
}
