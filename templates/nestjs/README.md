# Angular-webpack项目模板

本项目 demo 是基于 webpack 的 angular 项目，语言为 typescript + es6； 
本项目为单页应用，历史纪录基于 angular 默认的 html5 history api，在正式发布后，后台需配置相关页面解析逻辑，防止404页面出现

## 如何使用？

1. 打开控制台，并进入项目根目录
2. 在控制台输入以下代码 `npm install` 并回车，等待安装完毕 
3. 确保安装没有错误，运行 `npm start`，如无意外，这时将自动打开 chrome 浏览器，并显示出 demo 的默认页面了

## 项目约定

+ app 目录是存放主模块文件
+ assets 目录存放公共的图片和样式表
+ modules 公共模块目录
+ pages 存放页面文件夹  

你可以在 src 内扩展你需要的目录

## 代码风格
+ 项目采用了 **tslint** 作为代码检查工具
+ 请确保代码风格符合 [codelyzer](https://angular.cn/docs/ts/latest/guide/style-guide.html) 标准，否则启动和构建会不成功，如果不小心写出的代码不符合代码规范，请注意控制台输出错误的信息，并做出相应更改，直到没有代码语法错误

## 自动化测试
`npm run test`
为确保项目的健壮性、可维护性和可预期，建议为每一个项目中的文件写单元测试，测试工具为 karma，框架为 jasmine，相关文档可上互联网上搜索  

默认情况下，单元测试文件以 `XXX.spec.ts` 命名

## 构建发布

1. 确认本地在开发过程中，没有代码错误，及编译警告
2. 在控制台输入 `npm run build`
3. 等编译完成后，会在根目录下生成一个 dist 的目录，里面存有打包编译后的文件

## 直接运行打包后的代码
```bash
npm run production
```

## 调试代理

接口代理默认拦截以 `/api/` 开头的请求，并会重写 url 为 `/`，目前通过 angular 的拦截器，并根据当前的环境添加 `/api` 的前缀，详情请查看 `src/app/api-interceptor.ts`



