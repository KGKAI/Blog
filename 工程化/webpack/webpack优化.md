[TOC]
# 1. 优化构建速度
### 1.1缩小文件的搜索范围
1. resolve字段主要是告诉我们怎么去搜索文件
  ```js
  resolve: {
      // 指定去哪些目录寻找第三方模块，避免层层查找
      modules: [path.resolve(__dirname, 'node_modules')],
      // 设置尽量少的值可以减少入口文件的搜索
      mainFields: ['main'],
      // 对于庞大的第三方库，使webpack直接使用min.js的值，避免在库内解析
      alias: {
          "react": path.resolve(__dirname, './node_modules/react/dist/react-min.js')
      },
      // 合理配置extensions，减少文件查找
      // 当import语句没带后缀时，webpack会根据定义的值进行查找
      // 值尽量少、使用频率高的值放到前面
      extensions: ['.js', '.json']
  }   
  ```
2. module.noParse字段告诉webpack不必解析哪些文件
3. 配置loader时，指定test、include、exclude缩小搜索范围
### 1.2 使用DllPlugin减少基础模块编译次数
### 1.3 使用HappyPack开启多进程loader转换
### 1.4 使用ParallelUglifyPlugin开启多进程压缩JS文件
# 2. 优化开发体验
### 2.1使用自动刷新
#### 2.1.1 webpack监听文件
webpack可以使用两种方式监听文件：1.启动时命令行添加--watch参数  2. 在配置文件中设置watch:true
```js
module.exports = {
    watch: true,
    watchOptions: {
        ignored: '/node_modules/',
        aggregateTimeout: 300,  //文件变动后多久发起构建，越大越好
        poll: 1000,  //每秒询问次数，越小越好
    }
}
```
#### 2.1.2 devServer刷新浏览器
### 2.2 开启模块热替换
模块热替换不刷新整个页面，只重新编译发生变化的模块，并用新模块替换老模块，所以预览反应更快，等待时间更少。
> 开启方式：
> 1. webpack-dev-server --hot
> 2. 使用HotModuleReplacementPlugin，配置文件中配置devServer,设置hot为true，然后使用plugins

# 优化输出质量-压缩文件体积
### 3.1 区分环境-减小生产环境代码体积
使用DefinePlugin来定义配置文件的环境
### 3.2 压缩代码-JS、ES、CSS
#### 压缩JS：Webpack内置UglifyJS插件、ParallelUglifyPlugin
通过构建AST，去掉无效代码、缩短变量名、去掉日志输出
### 3.3 使用TreeShaking剔除未使用的代码
依赖ES6的import、export的模块化语法，适合用于Lodash、utils.js等工具类较分散的文件。它正常工作的前提是代码必须采用ES6模块化语法。因为ES6模块化语法是静态的。
**启用TreeShaking**
1. 修改babelrc以保留ES6语法
   ```js
   {
        "presets": [
            [
                "env", 
                { "module": false },   //关闭Babel的模块转换功能，保留ES6模块化语法
            ]
        ]
    }
   ```
2. 启动webpack时带上 --display-used-exports可以在shell打印出关于代码剔除的提示
3. 使用UglifyJSPlugin，或者启动时使用--optimize-minimize
# 4. 优化输出质量-加速网络请求
### 4.1 使用CDN加速静态资源加载
```js
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {WebPlugin} = require('web-webpack-plugin');
//...
output:{
 filename: '[name]_[chunkhash:8].js',
 path: path.resolve(__dirname, 'dist'),
 publicPatch: '//js.cdn.com/id/', //指定存放JS文件的CDN地址
},
module:{
 rules:[{
     test: /\.css/,
     use: ExtractTextPlugin.extract({
         use: ['css-loader?minimize'],
         publicPatch: '//img.cdn.com/id/', //指定css文件中导入的图片等资源存放的cdn地址
     }),
 },{
    test: /\.png/,
    use: ['file-loader?name=[name]_[hash:8].[ext]'], //为输出的PNG文件名加上Hash值 
 }]
},
plugins:[
  new WebPlugin({
     template: './template.html',
     filename: 'index.html',
     stylePublicPath: '//css.cdn.com/id/', //指定存放CSS文件的CDN地址
  }),
 new ExtractTextPlugin({
     filename:`[name]_[contenthash:8].css`, //为输出的CSS文件加上Hash
 })
]
```
### 4.2 多页面应用提取公共代码，以利用缓存。
1. 把多个页面依赖的公共代码提取到common.js中，此时common.js包含基础库的代码
```js
    plugins:[
        new CommonsChunkPlugin({
            chunks:['a','b'], //从哪些chunk中提取
            name:'common',  // 提取出的公共部分形成一个新的chunk
        })
    ]
```
2. 找出依赖的基础库，写一个base.js文件，再与common.js提取公共代码到base中，common.js就剔除了基础库代码，而base.js保持不变
```js
//base.js
import 'react';
import 'react-dom';
import './base.css';
//webpack.config.json
entry:{
    base: './base.js'
},
plugins:[
    new CommonsChunkPlugin({
        chunks:['base','common'],
        name:'base',
        //minChunks:2, 表示文件要被提取出来需要在指定的chunks中出现的最小次数，防止common.js中没有代码的情况
    })        
]
```
3. 得到基础库代码base.js，不含基础库的公共代码common.js，和页面各自的代码文件xx.js。
### 4.3 分割代码以按需加载
import('show.js').then()是实现按需加载的关键.webpack内置对import()的支持，会以show.js为入口单独生成一个chunk。
还需要配置webpack
```js
    output: {
        filename: '[name].ext',
        chunkFileName: '[name].ext' // 指定动态生成的chunk在输出时的文件名称
    
```
# 5. 优化输出质量--提升代码运行时的效率
### 使用scope hosting
译作“作用域提升”,它分析模块间的依赖关系，尽可能将被打散的模块合并到一个函数中，但不能造成代码冗余，所以只有被引用一次的模块才能被合并。由于需要分析模块间的依赖关系，所以源码必须是采用了ES6模块化的，否则Webpack会降级处理不采用Scope Hoisting。
# 6. 使用输出分析工具
### webpack-bundle-analyzer
可视化分析工具
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [
    new BundleAnalyzerPlugin()
]
```
# 7. 其他tips
- 配置externals，排除因为已使用`<script>`标签引入而不用打包的代码，noParse是排除没使用模块化语句的代码。
- 可以使用url-loader把小图片转换成base64嵌入到JS或CSS中，减少加载次数
- 开发环境下将devtool设置为cheap-module-eval-source-map，因为生成这种source map的速度最快，能加速构建。在生产环境下将devtool设置为hidden-source-map

# 参考链接
https://juejin.im/post/5b652b036fb9a04fa01d616b#heading-2