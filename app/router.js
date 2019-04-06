'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 主页
  router.get('/', controller.home.index);

  // 登录注册
  router.post('/api/user/register/', controller.user.register);
  router.post('/api/user/login/', controller.user.login);
};