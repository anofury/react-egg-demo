/**
 * toast消息框
 * @param content
 */
export default function Toast(content) {
    var toastBox = document.querySelector('.toast-box'),
        span = content => `<span class="toast-word">${content}</span>`

    if (!!toastBox) document.body.removeChild(toastBox)

    window.div = document.createElement('div')
    window.div.className = "toast-box fade-in"
    window.div.innerHTML = span(content)

    document.body.appendChild(window.div)
    clearTimeout(window.timer1)
    clearTimeout(window.timer2)
    window.timer1 = setTimeout(_ => { window.div.className = "toast-box fade-out" }, 4000)
    window.timer2 = setTimeout(_ => {
        document.body.removeChild(window.div)
        delete window.div
        delete window.timer1
        delete window.timer2
    }, 4500)
}