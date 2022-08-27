/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './entity/article.entity';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
