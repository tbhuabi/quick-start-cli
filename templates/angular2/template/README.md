# angular2-webpack项目模板

本项目demo是基于webpack的angular2项目，样式表采用sass，语言为typescript+es6  
本项目为单页应用，历史纪录基于angular2默认的html5 history api，在正式发布后，后台需配置相关页面解析逻辑，防止404页面出现

## 如何使用？

1. 先点击右边的download按扭或直接通过git下载本项目代码到本地
2. 确保有安装node和npm，如未安装，请先安装[nodejs](http://nodejs.org)
3. 打开控制台，并进入项目根目录
4. 在控制台输入以下代码`npm install`并回车，等待安装完毕 
5. 确保安装没有错误，运行`npm start`，如无意外，这时将自动打开chrome浏览器，并显示出demo的默认页面了

## 项目约定

**所有src目录以外的文件，请勿更改**

+ assets目录存放公共的图片和样式表
+ components目录存放全局组件
+ views存放页面文件夹

## 代码风格
+ 项目采用了**tslint**作为代码检查工具
+ 请确保代码风格符合[codelyzer](https://angular.cn/docs/ts/latest/guide/style-guide.html)标准，否则启动和构建会不成功，如果不小心写出的代码不符合代码规范，请注意控制台输出错误的信息，并做出相应更改，直到没有代码语法错误

## 自动化测试
`npm run test`
为确保项目的健壮性、可维护性和可预期，建议为每一个项目中的文件写单元测试，测试工具为karma，框架为jasmine，相关文档可上互联网上搜索

## 构建发布

1. 确认本地在开发过程中，没有代码错误，及编译警告
2. 在控制台输入`npm run build`
3. 等编译完成后，会在根目录下生成一个dist的目录，里面存有打包编译后的文件


## 其它

后端代理未完成



