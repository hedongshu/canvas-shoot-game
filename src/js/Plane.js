import { Element } from './element.js'
import { Bullet } from './Bullet.js'
import { context } from './app.js'

/**
 * 飞机类
 */
export class Plane extends Element {
    constructor(opts) {
        super(opts)
        // 飞机属性
        this.icon = opts.icon
        this.minX = opts.minX
        this.maxX = opts.maxX

        // 子弹属性
        this.bullets = []
        this.bulletSize = opts.bulletSize
        this.bulletSpeed = opts.bulletSpeed
        // 控制子弹频率
        this.lastShoot = Date.now()
    }
    /**
     * 射击
     * 创建子弹
     */
    shoot() {
        // 200毫秒 射击一次
        if (Date.now() - this.lastShoot > 200) {
            let bulletOpts = {
                x: this.x + this.size.width / 2,
                y: this.y,
                size: this.bulletSize,
                speed: this.bulletSpeed
            }
            this.bullets.push(new Bullet(bulletOpts))
            this.lastShoot = new Date()
        }
    }
    /**
     * 移动
     * @param {String} direction 方向
     */
    translate(direction) {
        let speed = direction === 'left' ? -this.speed : this.speed
        this.move(speed, 0)
    }
    /**
     * 判断 所有子弹 中是否有击中传进来的敌人
     * @returns {Boolean} hasHit
     */
    hasHit(enemy) {
        let hasHit = false
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let bullet = this.bullets[i]
            if (bullet.crash(enemy)) {
                this.bullets.splice(i, 1)
                hasHit = true
                break
            }
        }
        return hasHit
    }
    /**
     * 绘制,更新子弹
     */
    drawBullets() {
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let bullet = this.bullets[i]
            bullet.up()
            if (bullet.y <= 0 - bullet.size) {
                this.bullets.splice(i, 1)
            } else {
                bullet.draw()
            }
        }
    }
    /**
     * 绘制
     */
    draw() {
        context.drawImage(
            this.icon,
            this.x,
            this.y,
            this.size.width,
            this.size.height
        )
        this.drawBullets()
    }
}
