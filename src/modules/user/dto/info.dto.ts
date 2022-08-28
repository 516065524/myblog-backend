/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches } from 'class-validator';

export class InfoDTO {
  @ApiProperty({
    description: '用户Id',
    example: '1',
  })
  @IsNotEmpty({ message: '未传入Id参数' })
  readonly id: number;
}
