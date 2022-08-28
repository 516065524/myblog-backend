/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { regMobileCN } from 'src/utils/regex.util';

export class RegisterDTO {
  @ApiProperty({
    description: '手机号,唯一',
    example: '13049153644',
  })
  @Matches(regMobileCN, { message: '请输入正确手机号' })
  @IsNotEmpty({ message: '请输入手机号' })
  readonly mobile: string;

  @ApiProperty({
    description: '用户名',
    example: '爱与诚',
  })
  @IsNotEmpty({ message: '请输入用户昵称' })
  @IsString({ message: '名字必须是string类型' })
  readonly nickname: string;

  @ApiProperty({
    description: '用户密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '请输入密码' })
  readonly password: string;

  @ApiProperty({
    description: '二次输入密码',
    example: '123456',
  })
  @IsNotEmpty({ message: '请再次输入密码' })
  readonly passwordRepeat: string;

  @ApiProperty({ example: '123456@qq.com', description: '邮箱' })
  @IsEmail({}, { message: '请填写正确格式的邮箱' })
  email: string;

  @ApiProperty({ example: 'admin', description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  username: string;

  @ApiProperty({
    example: 'https:www.xxx.png',
    description: '头像',
    required: false,
  })
  avactar: string;
}
