import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsUrl()
  longUrl: string;

  @IsOptional()
  @IsString()
  customAlias?: string;

  @IsOptional()
  @IsString()
  topic?: string;
}