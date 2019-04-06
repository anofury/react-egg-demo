/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + 'message-board';

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.static = {
    prefix: '/assert/',
    dir: path.join(appInfo.baseDir, 'app/web/page/')
  };

  config.view = {
    mapping: {
      '.html': 'ejs'
    },
    root: path.join(appInfo.baseDir, 'app/web/page')
  };

  // 中间件
  config.middleware = ['assertRedirect', 'sessionDetect'];
  config.assertRedirect = {
    redirectFrom: oldUrl => `/assert${oldUrl}`
  }

  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'test',
      database: 'test',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.security = {
    csrf: {
      enable: false,
    }
  }

  config.session = {
    key: 'SESSION_ID',
    maxAge: 0,
    httpOnly: true,
    encrypt: true,
  };

  config.cluster = {
    listen: {
      port: 8080,
      hostname: '127.0.0.1',
    }
  }

  return {
    ...config,
    ...userConfig,
  };
};
