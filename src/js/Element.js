/**
 * 父类
 */
export class Element {
    constructor(opts) {
        this.x = opts.x
        this.y = opts.y
        this.size = opts.size
        this.speed = opts.speed
    }
    /**
     * 原型方法 改变x, y的值
     * @param {string} x
     * @param {*} y
     */
    move(x, y) {
        let addX = x || 0
        let addY = y || 0
        this.x += addX
        this.y += addY
    }
    /**
     * 原型方法 绘制
     */
    draw() {}
}
