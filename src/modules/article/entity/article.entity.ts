/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Common } from 'src/common/entity/common.entity';
import { User } from 'src/modules/user/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Article extends Common {
  // 文章标题
  @Column({ length: 32, unique: true, comment: '文章标题' })
  title: string;

  // 文章描述
  @Column({ length: 300, comment: '文章描述' })
  description: string;

  // 文章内容
  @Column({ type: 'text', comment: '文章内容' })
  content: string;

  @Column({ comment: '用户ID' })
  userId: number;

  @Column({ comment: '标签ID', default: '' })
  tagId: string;

  @Column({ comment: '文章封面图片', default: '' })
  coverImg: string;

  @Column({ nullable: true, comment: '排序ID' })
  orderId: number;

  @Column({ nullable: true, default: 0, comment: '阅读量' })
  readVolume: number;

  @Column({ nullable: true, default: 0, comment: '收藏人数' })
  collectionVolume: number;

  @ManyToOne(() => User)
  user: User;
}
