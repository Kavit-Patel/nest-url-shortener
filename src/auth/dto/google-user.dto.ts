import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class GoogleUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Google unique identifier for the user',
    example: '1234567890abcdef',
  })
  googleId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @IsEmail()
  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  email: string;

}
