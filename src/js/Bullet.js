import { Element } from './element.js'
import { context } from './app.js'

/**
 * 子弹类
 */
export class Bullet extends Element {
    constructor(opts) {
        super(opts)
    }
    /**
     * 向上
     */
    up() {
        this.move(0, -this.speed)
    }
    /**
     * 绘制
     */
    draw() {
        context.fillStyle = '#fff'
        context.fillRect(this.x, this.y, 1, this.size)
    }
    /**
     * 判断子弹是否击中传进来的敌人
     * @param {Object} enemy 敌人
     */
    crash(enemy) {
        if (
            !(enemy.x + enemy.size < this.x) &&
            !(this.x + 1 < enemy.x) &&
            !(enemy.y + enemy.size < this.y) &&
            !(this.y + this.size < enemy.y)
        ) {
            return true
        }

        return false
    }
}
