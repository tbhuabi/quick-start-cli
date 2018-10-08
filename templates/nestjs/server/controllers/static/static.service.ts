import { Injectable } from '@nestjs/common';
import { resolve } from 'path';
import { NextFunction, Response, Request, static as staticFn } from 'express';

import { devClientDomain, isProduction } from '../../../global.config';

const httpProxyMiddleware: (config: any) => any = require('http-proxy-middleware');
const historyApiFallback = require('connect-history-api-fallback');

@Injectable()
export class StaticService {
  get middleware() {
    return isProduction ?
      function middleware(request: Request, response: Response, next: NextFunction) {
        historyApiFallback()(request, response, function () {
          staticFn(resolve(__dirname, '../../views'))(request, response, next);
        });
      } :
      httpProxyMiddleware({
        target: devClientDomain,
        onProxyReq: (proxyRequest: any, request: any) => {
          console.log(`请求：${request.url}代理到本地静态资源服务 -> ${devClientDomain}`);
        }
      });
  };

  transform(request: Request, response: Response, next: NextFunction) {
    return this.middleware(request, response, next);
  }
}
