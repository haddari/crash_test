import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyOtpDto {
  @ApiProperty({
    description : 'the recovery code',
    example : '123645'
  })
  @IsString()
  recoveryCode: string;

  
}
