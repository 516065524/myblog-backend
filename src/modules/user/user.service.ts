/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { encryptPassword, makeSalt } from 'src/utils/cryptogram.util';
import { Repository } from 'typeorm';
import { RegisterDTO } from './dto/register.dto';
import { User } from './entity/user.entity';
import { LoginDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InfoDTO } from './dto/info.dto';
import { randomAvatar } from 'src/constant/avatar';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRespository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async checkRegisterForm(registerDTO: RegisterDTO): Promise<any> {
    if (registerDTO.password !== registerDTO.passwordRepeat) {
      throw new NotFoundException('两次输入的密码不一致,请检查');
    }
    const { mobile } = registerDTO;
    const hasUser = await this.userRespository.findOne({ where: { mobile } });
    if (hasUser) {
      throw new NotFoundException('用户已存在');
    }
  }

  async register(registerDTO: RegisterDTO): Promise<any> {
    await this.checkRegisterForm(registerDTO);
    const { nickname, password, mobile, email, avactar, username } =
      registerDTO;
    const newUser: User = new User();
    if (!avactar) {
      newUser.avactar = randomAvatar();
    }
    const salt = makeSalt();
    const hasPassWord = encryptPassword(password, salt);
    newUser.nickname = nickname;
    newUser.mobile = mobile;
    newUser.password = hasPassWord;
    newUser.salt = salt;
    newUser.email = email;
    newUser.username = username;
    newUser.salt = salt;
    newUser.salt = salt;
    return await this.userRespository.save(newUser);
  }
  // 登陆校验用户信息
  async checkLoginForm(loginDTO: LoginDTO): Promise<any> {
    const { mobile, password } = loginDTO;
    const user = await this.userRespository
      .createQueryBuilder('user')
      .addSelect('user.salt')
      .addSelect('user.password')
      .where('user.mobile = :mobile', { mobile })
      .getOne();

    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    const { password: dbPassword, salt } = user;
    const currentHashPassword = encryptPassword(password, salt);
    if (currentHashPassword !== dbPassword) {
      throw new NotFoundException('密码错误');
    }

    return user;
  }

  // 获取信息
  async getInfo(infoTO: InfoDTO) {
    const { id } = infoTO;
    console.log(infoTO);
    const user = await this.userRespository.findOne({
      where: { id },
      select: ['nickname', 'mobile'],
    });
    if (!user) {
      throw new NotFoundException('用户不存在');
    }
    return {
      userInfo: Object.assign(user, { userId: id }),
    };
  }

  certificate(user: User) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      mobile: user.mobile,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async login(loginDTO: LoginDTO): Promise<any> {
    const user = await this.checkLoginForm(loginDTO);
    const token = await this.certificate(user);
    return {
      info: {
        token,
      },
    };
  }
}
