/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entity/article.entity';
import { LessThan, Repository } from 'typeorm';
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

  /**
   * @desc 文章查询接口
   * 1：tag没有关联表，存的是[].join(',')格式，所以后端查询typeorm没有api支持，所以这里改为sql查询
   * 2：查询多标题的时候是or关系需要()，需要注意
   * 3：子查询或者left join查询的性能实际很低，自己用代码查询组装数据性能会高很多，只需要查询两次
   * @param listDTO
   * @returns
   */
  async getMore(listDTO: ListDTO) {
    const { page = 1, pageSize = 10, title, tagId } = listDTO;
    let tagIdList = [];
    tagId && (tagIdList = tagId.split(','));
    /* 子查询只可以查询一个字段 */
    // let sql = 'select *,(select nickname from tb_user where tb_user.id = userId) as nickname,(select name from tb_type where tb_type.id = typeId) as typename from tb_article where id > 0'
    /* left join可以查询整表,可以指定字段 */
    // let sql = 'select A.*,B.nickname,B.username from tb_article as A LEFT JOIN  tb_user as B on A.userId = B.id where A.id > 0'
    /* 基础查询即可，扩展数据自己组装 */
    let sql = 'select * from article as A  where A.id > 0';
    if (tagId) {
      let tagSql = '';
      tagIdList.forEach(
        (t, i) =>
          (tagSql +=
            i == tagId.length - 1
              ? `find_in_set(${t}, A.tagId)`
              : `find_in_set(${t}, A.tagId) or `),
      );
      sql += ` and (${tagSql})`;
    }
    title && (sql += ` and A.title like '%${title}%'`);
    sql += ` ORDER BY orderId DESC`;
    /* 查询count总数要在分页前查询完 */
    const countSql = ` select count(*) as total from (${sql}) as a`;
    const count: any = await this.articleRepository.query(countSql);
    /* 添加分页 */
    sql += ' limit ' + (page - 1) * pageSize + ',' + pageSize;
    const rows: any = await this.articleRepository.query(sql);
    console.log(rows);
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
    // const article = new Article();
    // article.title = articleCreateDTO.title;
    // article.description = articleCreateDTO.description;
    // article.content = articleCreateDTO.content;
    console.log(articleCreateDTO);
    let { tagId } = articleCreateDTO;
    if (!tagId) {
      tagId = '';
    }
    const res = await this.articleRepository.findOne({
      where: { orderId: LessThan(5000) },
      order: { orderId: 'DESC' },
      select: ['id', 'orderId'],
    });
    if (!res || !res.orderId) {
      articleCreateDTO.orderId = 1;
    }
    !articleCreateDTO.orderId && (articleCreateDTO.orderId = res.orderId + 10);
    const result = await this.articleRepository.save(articleCreateDTO);
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
