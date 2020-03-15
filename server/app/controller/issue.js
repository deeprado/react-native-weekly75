'use strict';

const Controller = require('egg').Controller;

const tmpNews = {
  iid: 1,
  url: 'https://baike.baidu.com/item/%E5%A3%AB%E5%A4%A7%E5%A4%AB/399489?fr=aladdin',
  title: 'JS一定要放在body的最底部',
  description: '一个面试题引发的思考',
  tags: [
    'javascript',
    '渲染',
    '浏览器',
  ],
  provider: 1,
};

const tmpTopic = {
  iid: 1,
  date: '2019-11-06',
};

const tmpTopics = {
  JavaScript: [
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
  ],
  CSS: [
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
};

const tmpData = {
  detail: {
    iid: 2,
    date: '2019-11-06',
  },
  list: [
    {
      ...tmpTopics,
    },
    {
      ...tmpTopics,
    },
    {
      ...tmpTopics,
    },
  ],
};

class IssueController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async latest() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        ...tmpData,
      },
    };
  }
  async detail() {
    const { ctx } = this;
    ctx.body = {
      code: 0,
      data: {
        ...tmpData,
      },
    };
  }
  async list() {
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
            ...tmpTopic,
            iid: 1,
          },
          {
            ...tmpTopic,
            iid: 2,
          },
          {
            ...tmpTopic,
            iid: 3,
          },
          {
            ...tmpTopic,
            iid: 4,
          },
          {
            ...tmpTopic,
            iid: 5,
          },
          {
            ...tmpTopic,
            iid: 6,
          },
        ],
      },
    };
  }
}

module.exports = IssueController;
