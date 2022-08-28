/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line prettier/prettier
import { IsNotEmpty } from 'class-validator';
import { Common } from 'src/common/entity/common.entity';
import { Article } from 'src/modules/article/entity/article.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User extends Common {
  @Column({ length: 12 })
  username: string;

  @Column({ default: 1 })
  sex: number;

  @Column({ length: 600, unique: true })
  avactar: string;

  @Column({ length: 10, default: 'viewer' })
  role: string;

  @Column({ length: 64, unique: true })
  email: string;

  // 昵称
  @Column('text')
  nickname: string;

  // 手机号
  @Column('text')
  mobile: string;

  // 加密后的密码
  @Column('text', { select: false })
  password: string;

  // 加密盐
  @Column('text', { select: false })
  salt: string;

  @OneToMany(() => Article, (article) => article.id)
  @JoinColumn({ name: 'nickname' })
  articles: Article[];
}
