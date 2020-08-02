[TOC]
# loader运行的总体流程
- Compiler.js中会将用户配置与默认配置合并，其中就包含了loader部分
- webpack会根据配置创建NormalModuleFactory,它可以用来创建NormalModule
- 在创建NormalModule实例之前还要通过loader的resolver解析loader路径
- 在NormalModule实例创建之后，则会通过其build方法来进行模块的构建。构建模块的第一步就是使用loader来加载并处理模块内容。而loader-runner这个库就是webpack中loader的运行器
- 最后，将loader处理完的模块内容输出，进入后续的编译流程
# 有哪些常见的loader
### file-loader
    file-loader并不会对文件内容进行任何转换，只是复制一份文件内容，并根据配置为他生成一个唯一的文件名。
### url-loader
    像file-loader一样工作，但如果文件小于限制，可以返回data url
### css-loader
css-loader的作用是处理css中的@import和url()这样的外部资源
### style-loader
style-loader的作用是把样式插入到DOM中，方法是在head中插入一个style标签，并把样式写入到这个标签的innerHTML里
### less-loader
把less编译成css