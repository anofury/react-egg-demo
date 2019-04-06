import React, { Component } from 'react'
import Toast from '../../common/Toast'
import './Register.css'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count: '',
            nickName: '',
            password1: '',
            password2: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.validate = this.validate.bind(this)
        this.onTapSubmit = this.onTapSubmit.bind(this)
        this.countQA = this.countQA.bind(this)
        this.onKeyDownEnter = this.onKeyDownEnter.bind(this)
    }

    // props缺省值
    static defaultProps = {
        countQA: _ => { console.log('点击了已有账号') }
    }

    // 点击已有账号
    countQA() { this.props.countQA() }

    // 监听输入
    handleInputChange(e) {
        var target = e.target
        this.setState({ [target.id]: target.value.replace(/\s+/g, '') })
    }

    // 验证表单填写正确性
    validate() {
        var { count, nickName, password1, password2 } = this.state
        if (!!count && !!nickName && !!password1 && !!password2 && password1 === password2) return true
        else if (!count) Toast('请输入登录账户名')
        else if (!nickName) Toast('请输入姓名')
        else if (!password1) Toast('请输入登录密码')
        else if (!password2) Toast('请再次输入登录密码')
        else if (password1 !== password2) Toast('两次密码输入不一致')
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
        }
    }

    render() {
        var { count, nickName, password1, password2 } = this.state
        return (
            <div className="register-component">
                <h1>注册</h1>
                <div className="input-gounp">
                    <label htmlFor="count">学号</label>
                    <input type="text" id="count" value={count} onChange={this.handleInputChange} />
                </div>
                <div className="input-gounp">
                    <label htmlFor="nickName">姓名</label>
                    <input type="text" id="nickName" value={nickName} onChange={this.handleInputChange} />
                </div>
                <div className="input-gounp">
                    <label htmlFor="password1">登录密码</label>
                    <input type="password" id="password1" value={password1} onChange={this.handleInputChange} />
                </div>
                <div className="input-gounp">
                    <label htmlFor="password2">确认密码</label>
                    <input type="password" id="password2" value={password2} onChange={this.handleInputChange} onKeyDown={this.onKeyDownEnter} />
                </div>
                <div className="input-gounp">
                    <label htmlFor=""></label>
                    <button onClick={this.onTapSubmit}>注册</button>
                </div>
                <div className="count-qa"><a href="javascript:;" onClick={this.countQA}>已有账号？点击登录</a></div>
            </div>
        )
    }
}

export default Register