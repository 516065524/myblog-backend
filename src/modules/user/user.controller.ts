import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { RegisterDTO } from './dto/register.dto';
import { UserInfoResponse } from './vo/user-info.vo';
import { LoginDTO } from './dto/login.dto';
import { TokenResponse } from './vo/token.vo';
import { InfoDTO } from './dto/info.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({ type: RegisterDTO })
  @ApiOkResponse({ description: '注册', type: UserInfoResponse })
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO): Promise<UserInfoResponse> {
    return this.userService.register(registerDTO);
  }

  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ description: '登录', type: TokenResponse })
  @Post('login')
  async login(@Body() loginDTO: LoginDTO): Promise<any> {
    return this.userService.login(loginDTO);
  }

  @ApiBody({ type: LoginDTO })
  @ApiOkResponse({ description: '个人信息', type: TokenResponse })
  @Get('getInfo')
  async getInfo(@Query() infoDTO: InfoDTO): Promise<any> {
    return this.userService.getInfo(infoDTO);
  }
}
