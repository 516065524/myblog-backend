/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ArticleCreateDTO {
  @ApiProperty({
    description: '文章标题',
    example: '啊！美丽的大海',
  })
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title: string;
  @ApiProperty({
    description: '文章描述/简介',
    example: '给你讲述美丽的大海',
  })
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description: string;
  @ApiProperty({
    description: '文章内容',
    example: '啊！美丽的大海，你是如此美丽',
  })
  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content: string;
  @ApiProperty({
    description: '1',
    example: '作者Id',
  })
  @IsInt({ message: '作者Id参数类型错误' })
  readonly userId: number;

  @ApiProperty({
    example: 1,
    description: '排序Id 数字越大越靠前',
    required: false,
  })
  orderId?: number;

  @ApiProperty({
    example: '1,2',
    description: '标签id,逗号隔开',
    required: false,
  })
  // @IsString({ message: '标签id参数类型错误' })
  readonly tagId?: string;
}
