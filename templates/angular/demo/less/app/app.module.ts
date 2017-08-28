import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app';
import { PageHeaderComponent } from '../components/page-header/page-header';
import { PageFooterComponent } from '../components/page-footer/page-footer';

import { HomeComponent } from '../pages/home/home';
import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        AppComponent,
        PageHeaderComponent,
        PageFooterComponent,
        HomeComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
