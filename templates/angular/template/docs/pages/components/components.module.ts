import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { routing } from './components.routing';

// 应用组件 这里可以导入src目录下的组件

// 应用指令 这里可以导入src目录下的指令

// 公用组件
import { ComponentsComponent } from './components';
import { DocViewComponent } from '../../components/doc-view/doc-view';

// 示例组件
import { DateTimePickerExampleComponent } from './date-time-picker/date-time-picker-example';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        routing
    ],
    declarations: [
        DocViewComponent,
        ComponentsComponent,

        // 示例组件
        DateTimePickerExampleComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {
}