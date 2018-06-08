# canvas-shoot-game

这个小游戏基于 canvas / JavaScript , 默认一共六关

按左右方向键操控飞机移动,  按空格键射击,  击中敌人得一分

![image-20180608184111560](/var/folders/n3/91qp89v11n39xs_fvth32yr40000gn/T/abnerworks.Typora/image-20180608184111560.png)

![image-20180608184135521](/var/folders/n3/91qp89v11n39xs_fvth32yr40000gn/T/abnerworks.Typora/image-20180608184135521.png)

## 使用方法

```shell
npm run build
npm run start
```

这么简单就可以愉快的打一把, 岂不美哉

## 自定义游戏配置

游戏提供丰富的自定义配置

修改配置文件 `config.js`

```javascript
/**
 * 游戏相关配置
 * @type {Object}
 */
export var CONFIG = {
    status: 'start', // 游戏开始默认为开始中
    level: 1, // 游戏默认等级
    totalLevel: 6, // 总共6关
    numPerLine: 6, // 游戏默认每行多少个怪兽
    canvasPadding: 30, // 默认画布的间隔
    bulletSize: 10, // 默认子弹长度
    bulletSpeed: 10, // 默认子弹的移动速度
    enemySpeed: 2, // 默认敌人移动距离
    enemySize: 50, // 默认敌人的尺寸
    enemyGap: 10, // 默认敌人之间的间距
    enemyIcon: './img/enemy.png', // 怪兽的图像
    enemyBoomIcon: './img/boom.png', // 怪兽死亡的图像
    enemyDirection: 'right', // 默认敌人一开始往右移动
    planeSpeed: 5, // 默认飞机每一步移动的距离
    planeSize: {
        width: 60,
        height: 100
    }, // 默认飞机的尺寸,
    planeIcon: './img/plane.png'
}

```

## 最后

代码可读性比较好, 有兴趣的小哥可以自己加上更棒的功能