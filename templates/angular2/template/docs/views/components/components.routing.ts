import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components';
import { DateTimePickerExampleComponent } from './date-time-picker/date-time-picker-example';

const appRoutes: Routes = [{
    path: 'components',
    component: ComponentsComponent,
    children: [{
        path: 'date-time-picker',
        component: DateTimePickerExampleComponent,
        data: {
            html: require('./date-time-picker/date-time-picker-example.html'),
            ts: require('!!raw!./date-time-picker/date-time-picker-example'),
            doc: require('!!raw!./date-time-picker/doc.md')
        }
    }]
}];
export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);
