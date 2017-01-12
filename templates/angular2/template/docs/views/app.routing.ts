import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [{
    path: '',
    redirectTo: 'components/date-time-picker',
    pathMatch: 'full'
}];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
