import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app';
import { PageHeaderComponent } from '../components/page-header/page-header';
import { PageFooterComponent } from '../components/page-footer/page-footer';

import { HomeComponent } from '../pages/home/home';
import { routing } from './app.routing';
import { ApiInterceptor } from './api-interceptor';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        AppComponent,
        PageHeaderComponent,
        PageFooterComponent,
        HomeComponent
    ],
    providers: [{
        provide: HTTP_INTERCEPTORS,
        useClass: ApiInterceptor,
        multi: true
    }],
    bootstrap: [AppComponent]
})
export class AppModule {
}
