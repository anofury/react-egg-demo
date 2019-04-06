import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import Register from './components/Register/Register.jsx'
import Login from './components/Login/Login.jsx'
import Toast from './common/Toast.js'
import './index.css'

class Index extends Component {
    constructor() {
        super()
        this.state = {
            hasCount: true
        }
        this.countQA = this.countQA.bind(this)
    }

    // 切换注册登录组件
    countQA() { this.setState({ hasCount: !this.state.hasCount }) }

    render() {
        var { hasCount } = this.state
        return (
            <div className="test">{
                hasCount ? <Login countQA={this.countQA} />
                    : <Register countQA={this.countQA} />
            }</div>
        )
    }
}

ReactDOM.render(<Index />, document.querySelector('#root'))