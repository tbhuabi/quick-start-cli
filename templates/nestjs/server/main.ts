import { NestFactory } from '@nestjs/core';

import { prodPort, prodDomain, ip, devServerPort, devServerDomain, isProduction } from '../global.config';
import { api, name } from '../proxy.config';
import { AppModule } from './app.module';

const httpProxyMiddleware: (config: any) => any = require('http-proxy-middleware');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console
  });
  app.use('/api', httpProxyMiddleware({
    target: api,
    pathRewrite: {
      '^/api/': '/'
    },
    onProxyReq: (proxyRequest: any, request: any) => {
      console.log(`请求：${request.url}，代理到${name}：${api}${proxyRequest.path}`);
    }
  }));
  if (isProduction) {
    await app.listen(prodPort);
    console.log('服务启动：' + prodDomain);
  } else {
    await app.listen(devServerPort, ip);
    console.log('服务启动：' + devServerDomain);
  }
}

bootstrap();