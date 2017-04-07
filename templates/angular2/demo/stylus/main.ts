import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './views/app.module';

import 'normalize.css';
import './assets/stylus/index.styl';

if (process.env.ENV === 'production') {
    enableProdMode();
}
declare let module: any;
if (module.hot) {
    module.hot.accept();
}
platformBrowserDynamic().bootstrapModule(AppModule);
