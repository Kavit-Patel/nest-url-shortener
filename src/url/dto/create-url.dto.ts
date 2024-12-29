import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsUrl()
  @ApiProperty({ example: 'www.google.com', description: 'The Url to be shorte' })
  longUrl: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'google / yahoo', description: 'Nick name for the url' })
  customAlias?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'retantion / search-engine ', description: 'Topic or category of the url' })
  topic?: string;
}