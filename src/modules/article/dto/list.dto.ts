/* eslint-disable prettier/prettier */
import { IsOptional, Matches } from "class-validator";
import { regPositive } from "src/utils/regex.util";
import { ApiProperty } from "@nestjs/swagger";

export class ListDTO {
  @ApiProperty({
    description: '第几页',
    example: 1,
    required: false,
  })
  @IsOptional()
  @Matches(regPositive, {message: 'page不可小于0'})
  readonly page?: number;
  @ApiProperty({
    description: '每页数据条数',
    example: 10,
    required: false,
  })
  @IsOptional()
  @Matches(regPositive, {message: 'pageSize不可小于0'})
  readonly pageSize?: number;
}
