### 作用
window.requestAnimationFrame告诉浏览器，你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数。
### 回调函数参数
回调函数会被传入DOMHighResTimeStamp参数，该参数指示当前被reauestAnimationFrame排序的回调函数被触发的时间（开始去执行回调函数的时刻）
### 函数返回值
一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。

