## 性能监控指标
- DNS解析耗时
- TCP连接耗时
- 发送请求耗时
- 接收请求耗时
- 解析DOM耗时 domInteractive - domLoading
- DOM加载完成 domComplete - domInteractive 
- 页面加载耗时 loadEventEnd - navigationStart
- 白屏时间 responseStart - navigationStart
- 首屏时间 domComplete - navigationStart
- 资源下载总耗时 responseEnd - requestStart
## Performance的方法
- getEntries
- getEntriesByType
- getEntriesByName
- mark
- measure
- clearMark
- clearMeasure
## 参考
https://www.jianshu.com/p/5d3b9ef2f599