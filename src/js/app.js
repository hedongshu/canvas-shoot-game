import { requestAnimFrame, resourcesOnload, getMostX } from './util.js'
import { CONFIG } from './config.js'
import { Enemy } from './Enemy.js'
import { Plane } from './Plane.js'
import { Keyboard } from './Keyboard.js'

// 元素
let container = document.getElementById('game')
let levelText = document.querySelector('.game-level')
let nextLevelText = document.querySelector('.game-next-level')
var scoreText = document.querySelector('.game-info .score')
var totalScoreText = document.querySelector('.game-info-text .score')

// 画布
let canvas = document.getElementById('canvas')
export let context = canvas.getContext('2d')
let canvasWidth = canvas.clientWidth
let canvasHeight = canvas.clientHeight
/**
 * 整个游戏对象
 */
const GAME = {
    /**
     * 初始化函数,这个函数只执行一次
     * @param  {object} opts
     * @return {[type]}      [description]
     */
    init: function(opts) {
        opts = Object.assign({}, opts, CONFIG)
        this.opts = opts
        let self = this
        this.status = this.opts.status || 'start'
        levelText.innerText = `当前Level: ${opts.level}`
        this.score = 0
        // 键盘操作对象
        this.Keyboard = new Keyboard()

        // 资源列表
        let resourcesArr = [opts.enemyIcon, opts.enemyBoomIcon, opts.planeIcon]
        // 加载完成后
        resourcesOnload(resourcesArr, (images) => {
            opts.enemyIconImage = images[0]
            opts.enemyBoomIconImage = images[1]
            opts.planeIconImage = images[2]
            self.opts = opts
            this.bindEvent()
        })
    },
    bindEvent: function() {
        var self = this
        var playBtn = document.querySelector('.js-play')
        var replayBtns = document.querySelectorAll('.js-replay')
        var nextBtn = document.querySelector('.js-next')
        // 开始游戏按钮绑定
        playBtn.onclick = function() {
            self.play()
        }

        // 重新游戏按钮绑定
        replayBtns.forEach(function(btn) {
            btn.onclick = function() {
                self.opts.level = 1
                self.play()
                self.score = 0
                totalScoreText.innerText = self.score
            }
        })

        // 下一关按钮绑定
        nextBtn.onclick = function() {
            self.opts.level += 1
            self.play()
        }
    },
    /**
     * 更新游戏状态，分别有以下几种状态：
     * start  游戏前
     * playing 游戏中
     * failed 游戏失败
     * success 游戏成功
     * all-success 游戏通过
     * stop 游戏暂停（可选）
     */
    setStatus: function(status) {
        this.status = status
        container.setAttribute('data-status', status)
    },
    play: function() {
        let self = this
        let opts = this.opts
        let padding = opts.canvasPadding
        let level = opts.level
        let numPerLine = opts.numPerLine
        let totalLevel = opts.totalLevel
        let enemySize = opts.enemySize
        let enemySpeed = opts.enemySpeed
        let enemyGap = opts.enemyGap
        let enemyIcon = opts.enemyIconImage
        let enemyBoomIcon = opts.enemyBoomIconImage

        // 清空敌人
        this.enemys = []
        // 创建敌人
        for (let i = 0; i < level; i++) {
            for (let j = 0; j < numPerLine; j++) {
                let opts = {
                    x: j * (enemySize + enemyGap) + padding,
                    y: i * enemySize + padding,
                    speed: enemySpeed,
                    icon: enemyIcon,
                    boomIcon: enemyBoomIcon,
                    size: enemySize
                }
                this.enemys.push(new Enemy(opts))
            }
        }

        // 创建我的飞机
        let planeOpts = {
            x: (canvasWidth - opts.planeSize.width) / 2,
            y: canvasHeight - padding - opts.planeSize.height,
            speed: opts.planeSpeed,
            size: opts.planeSize,
            icon: opts.planeIconImage,
            minX: opts.canvasPadding,
            maxX: canvasWidth - opts.canvasPadding - opts.planeSize.width,
            bulletSize: opts.bulletSize,
            bulletSpeed: opts.bulletSpeed
        }
        this.plane = new Plane(planeOpts)

        // 显示分数
        scoreText.innerText = this.score
        totalScoreText.innerText = this.score

        this.setStatus('playing')
        this.updata()
    },
    /**
     * 每帧更新
     */
    updata: function() {
        let self = this
        let opts = this.opts
        let enemys = this.enemys
        let enemyMaxY =
            canvasHeight - opts.canvasPadding - opts.planeSize.height

        // 清除画布
        context.clearRect(0, 0, canvasWidth, canvasHeight)

        // 更新
        this.updataEnemy()
        this.updataPlane()
        // 更新分数
        scoreText.innerText = this.score
        totalScoreText.innerText = this.score

        // 敌人全部消失
        if (enemys.length === 0) {
            let endType =
                opts.level === opts.totalLevel ? 'all-success' : 'success'
            this.end(endType)
            return
        }
        // 最后一个敌人是否触底
        if (enemys[enemys.length - 1].y >= enemyMaxY) {
            this.end('failed')
            return
        }

        // 绘制画布
        this.draw()

        // 循环
        requestAnimFrame(() => {
            this.updata()
        })
    },
    /**
     * 更新我的飞机
     */
    updataPlane: function() {
        // 飞机移动
        if (this.Keyboard.pressLeft) {
            this.plane.translate('left')
        }
        if (this.Keyboard.pressRight) {
            this.plane.translate('right')
        }
        // 飞机射击
        if (this.Keyboard.pressSpace) {
            this.plane.shoot()
            // this.Keyboard.pressSpace = false
        }
        // 限制飞机移动范围
        this.plane.x = Math.max(this.plane.x, this.opts.canvasPadding)
        this.plane.x = Math.min(
            this.plane.x,
            canvasWidth - this.opts.canvasPadding - this.plane.size.width
        )
    },
    /**
     * 更新敌人
     */
    updataEnemy: function() {
        let enemys = this.enemys
        let opts = this.opts
        let padding = opts.canvasPadding
        let enemyMaxX = canvasWidth - padding - opts.enemySize
        // 获取x的最值
        let mostX = getMostX(enemys)
        // 是否需要向下
        let hasDown = false

        // 判断是否碰壁
        if (mostX.min < padding || mostX.max > enemyMaxX) {
            // 改变方向
            opts.enemyDirection =
                opts.enemyDirection === 'left' ? 'right' : 'left'
            hasDown = true
        }

        for (let i = enemys.length - 1; i >= 0; i--) {
            let enemy = enemys[i]
            // 向下移动
            if (hasDown) {
                enemy.down()
            }

            // 左右移动
            enemy.translate(opts.enemyDirection)

            // 判断敌人的不同状态
            switch (enemy.status) {
                case 'normal':
                    if (this.plane.hasHit(enemy)) {
                        enemy.booming()
                    }
                    break
                case 'booming':
                    enemy.booming()
                    break
                case 'died':
                    enemys.splice(i, 1)
                    // 敌人死亡, 得分+1
                    this.score += 1
                    break
                default:
                    break
            }
        }
    },
    /**
     * 绘制
     */
    draw: function() {
        // 绘制敌人
        this.enemys.forEach(function(enemy) {
            enemy.draw()
        })

        // 绘制我的飞机
        this.plane.draw()

        // 绘制得分
    },
    /**
     * 结束方式有三种
     * failed 失败
     * success 过关
     * all-success 全部通关
     */
    end: function(type) {
        switch (type) {
            case 'failed':
                this.setStatus('failed')
                scoreText.innerHTML = `${this.score}`
                break
            case 'success':
                this.setStatus('success')
                nextLevelText.innerHTML = `下一个Level： ${this.opts.level + 1}`
                break
            case 'all-success':
                this.setStatus('all-success')
                break
            default:
                break
        }
    }
}
// 初始化
GAME.init()
