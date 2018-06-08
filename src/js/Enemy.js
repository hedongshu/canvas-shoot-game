import { Element } from './element.js'
import { context } from './app.js'
/**
 * 敌人类
 */
export class Enemy extends Element {
    constructor(opts) {
        super(opts)
        /**
         * 敌人有三种状态
         * 正常 normal
         * 爆炸 booming
         * 死亡 died
         */
        this.status = 'normal'
        this.icon = opts.icon
        this.boomIcon = opts.boomIcon
        // 爆炸计数器
        this.count = 0
    }
    /**
     * 爆炸
     */
    booming() {
        this.status = 'booming'
        this.count++
        if (this.count >= 3) {
            this.status = 'died'
        }
    }
    /**
     * 左右移动
     * @param {String} direction 方向
     */
    translate(direction) {
        let speed = direction === 'left' ? -this.speed : this.speed
        this.move(speed, 0)
    }
    /**
     * 向下移动
     */
    down() {
        this.move(0, this.size)
    }
    draw() {
        switch (this.status) {
            case 'normal':
                context.drawImage(
                    this.icon,
                    this.x,
                    this.y,
                    this.size,
                    this.size
                )
                break
            case 'booming':
                context.drawImage(
                    this.boomIcon,
                    this.x,
                    this.y,
                    this.size,
                    this.size
                )
                break
        }
    }
}
