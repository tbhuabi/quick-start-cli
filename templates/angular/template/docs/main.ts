import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './views/app.module';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
// TODO 根据你选择的不同的css预处理语言，选择下面要引入的样式表
// import '../src/assets/scss/index.scss';
// import '../src/assets/less/index.less';
// import '../src/assets/stylus/index.styl';
import 'highlight.js/styles/github.css';
import './assets/css/base/font-family.css';
import './assets/css/components/doc.css';
import './assets/css/components/table.css';

if (process.env.ENV === 'production') {
    enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
