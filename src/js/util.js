// 判断是否有 requestAnimationFrame 方法，如果没有则模拟实现
export const requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 30)
    }

/**
 * 资源加载
 * @param {Array} resources 资源数组
 * @param {*} callback
 */
export function resourcesOnload(resources, callback) {
    let total = resources.length
    let finish = 0
    let images = []
    resources.forEach(function(res, i) {
        images[i] = new Image()
        images[i].src = res
        // 加载完成
        images[i].onload = () => {
            finish++
            if (finish === total) {
                callback(images)
            }
        }
    })
}

/**
 * 获取数组中x轴最大值, 和最小值 (用来判断是否碰壁)
 * @param {Array} arr
 */
export function getMostX(arr) {
    let max = null
    let min = null
    arr.forEach((item) => {
        max = max || item.x
        min = min || item.x

        max = item.x > max ? item.x : max
        min = item.x < min ? item.x : min
    })
    return { max: max, min: min }
}
