/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { Repository } from 'typeorm';
import { ListDTO } from './dto/list.dto';
import { IdDTO } from './dto/id.dto';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { getPagination } from 'src/utils';
import { ArticleListVO } from './vo/article-list.vo';

@Injectable()
export class ArticleService {
  list: any[];
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {
    this.list = [];
  }

  async getMore(listDTO: ListDTO) {
    const { page = 1, pageSize = 10 } = listDTO;
    const getList = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const [list, total] = await getList;
    console.log(list, await getList, 'pagination');
    const pagination = getPagination(
      total as unknown as number,
      pageSize,
      page,
    );
    return {
      list,
      pagination,
    } as unknown as ArticleListVO;
  }
  // 获取单条
  async getOne(idDTO: IdDTO) {
    const { id } = idDTO;
    const articleDetial = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id = :id', { id })
      .getOne();
    if (!articleDetial) {
      throw new NotFoundException('找不到文章');
    }
    return {
      info: articleDetial,
    };
  }

  // 创建文章
  async create(articleCreateDTO: ArticleCreateDTO) {
    const article = new Article();
    article.title = articleCreateDTO.title;
    article.description = articleCreateDTO.description;
    article.content = articleCreateDTO.content;
    const result = await this.articleRepository.save(article);
    return {
      info: result,
    };
  }

  // 更新文章
  async update(articleEditDTO: ArticleEditDTO) {
    const { id } = articleEditDTO;
    const articleToUpdate = await this.articleRepository.findOne({
      where: { id },
    });
    articleToUpdate.title = articleEditDTO.title;
    articleToUpdate.description = articleEditDTO.description;
    articleToUpdate.content = articleEditDTO.content;
    const result = await this.articleRepository.save(articleToUpdate);
    return {
      info: result,
    };
  }

  // 删除文章
  async delete(idDTO: IdDTO) {
    const { id } = idDTO;
    const articleToUpdate = await this.articleRepository.findOne({
      where: { id },
    });
    articleToUpdate.isDelete = true;
    const result = await this.articleRepository.save(articleToUpdate);
    return {
      info: result,
    };
  }
}
