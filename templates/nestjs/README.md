# Nestjs + Angular + Sass 项目模板

## 如何使用？

1. 打开控制台，并进入项目根目录
2. 在控制台输入以下代码 `npm install` 并回车，等待安装完毕 
3. 确保安装没有错误，运行 `npm run dev:client`，再开启一个新的命令行窗口，运行 `npm run dev:server`，等编译启动完毕，可以在控制台看到访问址，在浏览器打开相应地址，即可看到 demo 页面

## 项目约定

+ views 目录是存放 angular 前端文件
+ server 目录存放 nest 后端文件

## 代码风格
+ 项目采用了 **tslint** 作为代码检查工具
+ 请确保代码风格符合 [codelyzer](https://angular.cn/docs/ts/latest/guide/style-guide.html) 标准，否则启动和构建会不成功，如果不小心写出的代码不符合代码规范，请注意控制台输出错误的信息，并做出相应更改，直到没有代码语法错误

## 构建发布

1. 确认本地在开发过程中，没有代码错误，及编译警告
2. 在控制台输入 `npm run build`
3. 等编译完成后，会在根目录下生成一个 build 的目录，里面存有打包编译后的文件

## 直接运行打包后的代码

一般用在生产环境，你也可以根据自己的需要修改，需要安装 pm2，具体可以查看 pm2 文档。
```bash
npm run production
```

## 调试代理

接口代理默认拦截以 `/api/` 开头的请求，并会重写 url 为 `/`，目前通过 angular 的拦截器，并根据当前的环境添加 `/api` 的前缀，详情请查看 `src/app/api-interceptor.ts`



