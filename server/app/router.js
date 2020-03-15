'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.get('/issue/latest', controller.issue.latest);
  router.get('/issue/detail', controller.issue.detail);
  router.get('/issue/list', controller.issue.list);


  router.get('/article/search', controller.article.search);
  router.get('/article/title', controller.article.title);
  router.post('/article/admin', controller.article.admin);

};
