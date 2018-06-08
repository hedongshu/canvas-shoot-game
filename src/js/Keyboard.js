/**
 * 键盘操作类
 */
export class Keyboard {
    constructor() {
        document.addEventListener('keydown', (event) => {
            this.keydown(event)
        })
        document.addEventListener('keyup', (event) => {
            this.keyup(event)
        })
        this.pressLeft = false
        this.pressRight = false
        this.pressSpace = false
    }
    /**
     * 按下
     * @param {*} event
     */
    keydown(event) {
        let key = event.keyCode
        switch (key) {
            case 37:
                this.pressLeft = true
                this.pressRight = false
                break
            case 39:
                this.pressRight = true
                this.pressLeft = false
                break
            case 32:
                this.pressSpace = true
            default:
                break
        }
    }
    /**
     * 松开
     * @param {} event
     */
    keyup(event) {
        let key = event.keyCode
        switch (key) {
            case 37:
                this.pressLeft = false
                break
            case 39:
                this.pressRight = false
                break
            case 32:
                this.pressSpace = false
            default:
                break
        }
    }
}
