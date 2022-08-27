/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Common } from 'src/common/entity/common.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class Article extends Common {
    
    // 文章标题
    @Column('text')
    title: string

    // 文章描述
    @Column('text')
    description: string;

    // 文章内容
    @Column('text')
    content: string;
}
