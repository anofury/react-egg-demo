'use strict';

const Controller = require('egg').Controller;

// 注册需要 学号 昵称 密码
const registerRule = {
    stuid: { type: 'string', required: true },
    nickname: { type: 'string', required: true },
    password: { type: 'string', required: true }
};

// 登录需要 学号 密码
const loginRule = {
    stuid: { type: 'string', required: true },
    password: { type: 'string', required: true }
};

class UserController extends Controller {
    // 注册
    async register() {
        const { ctx, app } = this
        try {
            ctx.validate(registerRule, ctx.request.body)
        } catch (error) {
            ctx.body = app.ERROR_PARAM_RESP()
            return
        }

        const result = await ctx.service.user.register(ctx.request.body);
        result === 2 ? ctx.body = app.REPEATING_DATA_RESP() : result === 1
            ? ctx.body = app.SUCCESS_RESP([]) : ctx.body = app.ERROR_SERVER_RESP([])
    }

    // 登录
    async login() {
        const { ctx, app } = this
        try {
            ctx.validate(loginRule, ctx.request.body)
        } catch (error) {
            ctx.body = app.ERROR_PARAM_RESP()
            return
        }

        const result = await ctx.service.user.login(ctx.request.body);
        if (!!result) {
            ctx.session.user = result;
            ctx.body = app.SUCCESS_RESP([result])
        } else ctx.body = app.UNAUTHORIZED_RESP()
    }
}

module.exports = UserController;
