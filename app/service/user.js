'use strict';

const Service = require('egg').Service;

class UserService extends Service {
	// 注册
	async register(param) {
		const { ctx, app } = this
		const check = await app.mysql.select('b_user', {
			where: { stu_id: param.stuid }
		});
		if (!!check.length) return 2
		else {
			const result = await app.mysql.insert('b_user', {
				stu_id: param.stuid,
				nick_name: param.nickname,
				password: param.password,
				create_time: new Date()
			});
			return Number(result.affectedRows === 1)
		}
	}

	// 登录
	async login(param) {
		const { ctx, app } = this
		const check = await app.mysql.select('b_user', {
			where: { stu_id: param.stuid, password: param.password }
		});
		// 如果用户存在，则返回用户信息给controller，否则返回空对象
		if (!!check.length) {
			return { id: check[0].id, nickname: check[0].nick_name, stuid: check[0].stu_id }
		} else return null
	}
}

module.exports = UserService;
