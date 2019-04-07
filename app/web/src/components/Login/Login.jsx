import React, { Component } from 'react'
import Toast from '../../common/Toast'
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: '',
            password: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.validate = this.validate.bind(this)
        this.onTapSubmit = this.onTapSubmit.bind(this)
        this.countQA = this.countQA.bind(this)
        this.onKeyDownEnter = this.onKeyDownEnter.bind(this)
    }

    // props缺省值
    static defaultProps = {
        countQA: _ => { console.log('点击没有账号') },
        loginSuccess: _ => { console.log('登录成功') }
    }

    // 点击没有账号
    countQA() { this.props.countQA() }

    // 监听输入
    handleInputChange(e) {
        var target = e.target
        this.setState({ [target.id]: target.value.replace(/\s+/g, '') })
    }

    // 验证表单填写正确性
    validate() {
        var { count, password } = this.state
        if (!!count && !!password) return true
        else if (!count) Toast('请输入登录账户名')
        else if (!password) Toast('请输入登录密码')
        return false
    }

    // 在密码输入框按回车
    onKeyDownEnter(e) {
        if (e.keyCode === 13) this.onTapSubmit()
    }

    // 点击提交按钮
    onTapSubmit() {
        if (this.validate()) {
            console.log(this.state)
            // const body = { stuid: this.state.count, password: this.state.password }
            // fetch('/api/user/login/', {
            //     method: 'POST',
            //     credentials: 'include',
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            //     },
            //     body: Object.keys(body).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(body[key])).join('&')
            // }).then(resp => resp.json())
            //     .then(data => {
            //         if (data.code === 200) {
            //             // 回调
            //         } else Toast(data.msg)
            //     })
        }
    }

    render() {
        var { count, password } = this.state
        return (
            <div className="login-component">
                <h1>登录</h1>
                <div className="input-gounp">
                    <label htmlFor="count">登录ID</label>
                    <input type="text" id="count" value={count} onChange={this.handleInputChange} />
                </div>
                <div className="input-gounp">
                    <label htmlFor="password">登录密码</label>
                    <input type="password" id="password" value={password} onChange={this.handleInputChange} onKeyDown={this.onKeyDownEnter} />
                </div>
                <div className="input-gounp">
                    <label htmlFor=""></label>
                    <button onClick={this.onTapSubmit}>登录</button>
                </div>
                <div className="count-qa"><a href="javascript:;" onClick={this.countQA}>没有账号？点击注册</a></div>
            </div>
        )
    }
}

export default Login