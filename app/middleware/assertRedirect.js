// 当使用类似 /css/index.css 形式访问静态资源时
// 将该路径替换为 /assert/css/index.css
module.exports = (options, app) => {
    return async function assertRedirect(ctx, next) {
        const { url } = ctx
        if (/\/(css|js|font|img|image)\/\S+\.\S+/.test(url)) {
            ctx.redirect(options.redirectFrom(url))
        } else await next()
    }
}