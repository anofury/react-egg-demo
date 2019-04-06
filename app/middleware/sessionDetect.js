// 检测当前用户是否存在session
module.exports = (options, app) => {
    return async function sessionDetect(ctx, next) {
        const noUser = {
            code: -1,
            msg: 'NO USER',
            data: []
        }
        if (ctx.url.indexOf('user') !== -1 || ctx.url === '/') await next()
        else if (ctx.session.user) {
            const user = ctx.session.user
            const check = await app.mysql.select('b_user', {
                where: { id: user.id, stu_id: user.stuid }
            });
            // 用户不存在
            if (!check.length) {
                delete ctx.session.user
                ctx.body = noUser
            }
            else await next()
        }
        else ctx.body = noUser
    }
}