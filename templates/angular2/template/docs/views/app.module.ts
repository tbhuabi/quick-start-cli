import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';

// 主组件
import { AppComponent } from './app';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ComponentsModule,
        routing
    ],
    declarations: [

        // 页面组件
        AppComponent,
    ],
    providers: [
        Title
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
}