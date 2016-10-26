# Quick-start-cli

通过Quick-start-cli可以快速搭建一个基于webpack的前端项目

## 脚手架特性
框架支持
- Angular2
- React
- Vue2

CSS预处理语言支持
- less
- sass
- stylus

其他特点
- 本地HTTP服务，不依赖后端服务
- 动态代理后端接口，实现前后端开发完全分离
- 一行命令，打包压缩

## 使用方法
全局安装
```bash
npm install -g quick-start-cli
```
检测是否完状成功
```bash
qs -v
```
创建一个项目，并根据控制台的提示输入相应内容
```bash
qs -c
```
## 安装项目依赖
进入你刚创建的项目，安装项目依赖
```bash
cd 你的项目名
npm install
```

## 其它
启动项目
```bash
npm start
```
单元测试
```bash
npm run test
```
打包压缩
```bash
npm run build
```


