import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './views/app.module';

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../src/assets/scss/index.scss';
import 'highlight.js/styles/github.css';
import './assets/css/base/font-family.css';
import './assets/css/components/doc.css';
import './assets/css/components/table.css';

if (process.env.ENV === 'production') {
    enableProdMode();
}
declare let module: any;
if (module.hot) {
    module.hot.accept();
}
platformBrowserDynamic().bootstrapModule(AppModule);
