'use strict';

const Controller = require('egg').Controller;

const tmpNews = {
  iid: 1,
  url: 'https://baike.baidu.com/item/%E5%A3%AB%E5%A4%A7%E5%A4%AB/399489?fr=aladdin',
  title: '士大夫',
  description: '士大夫',
  tags: [
    '士大夫',
    '士大夫',
  ],
  provider: 1,
};

class ArticleController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async title() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: '这是标题:' + new Date(),
    };
  }
  async search() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        count: 10,
        totalPage: 2,
        numsPerPage: 10,
        currentPage: 1,
        list: [
          {
            ...tmpNews,
            iid: 1,
          },
          {
            ...tmpNews,
            iid: 2,
          },
          {
            ...tmpNews,
            iid: 3,
          },
          {
            ...tmpNews,
            iid: 4,
          },
          {
            ...tmpNews,
            iid: 10,
          },
          {
            ...tmpNews,
            iid: 20,
          },
          {
            ...tmpNews,
            iid: 30,
          },
          {
            ...tmpNews,
            iid: 40,
          },
        ],
      },
    };
  }
  async admin() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
}

module.exports = ArticleController;
