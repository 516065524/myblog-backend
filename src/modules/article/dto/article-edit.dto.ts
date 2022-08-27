/* eslint-disable prettier/prettier */
import { IsNotEmpty, Matches } from "class-validator";
import { regPositive } from "src/utils/regex.util";
import { ApiProperty } from "@nestjs/swagger";
export class ArticleEditDTO {
  @ApiProperty({
    description: '文章id',
    example: '1',
  })
  @Matches(regPositive, { message: '请输入有效 id' })
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
  @ApiProperty({
    description: '文章标题',
    example: '啊！美丽的大山',
  })
  readonly title: string;
  @ApiProperty({
    description: '文章描述/简介',
    example: '给你讲述美丽的大山',
  })
  readonly description: string;
  @ApiProperty({
    description: '文章内容',
    example: '啊！美丽的大山，你是如此美丽',
  })
  readonly content: string;
}
