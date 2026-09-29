import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,

    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module')
            .then(m => m.DashboardModule)
      },

      {
        path: 'branding-ui',
        loadChildren: () =>
          import('./modules/branding/branding.module')
            .then(m => m.BrandingModule)
      },

      {
        path: 'app-whitelist',
        loadChildren: () =>
          import('./modules/app-whitelist/app-whitelist.module')
            .then(m => m.AppWhitelistModule)
      },

      {
        path: 'organizations',
        loadChildren: () =>
          import('./modules/organizations/organizations.module')
            .then(m => m.OrganizationsModule)
      },

      {
        path: 'application-management',
        loadChildren: () =>
          import('./modules/application-management/application-management.module')
            .then(m => m.ApplicationManagementModule)
      },

      {
        path: 'device-management',
        loadChildren: () =>
          import('./modules/device-management/device-management.module')
            .then(m => m.DeviceManagementModule)
      },

      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/settings/settings.module')
            .then(m => m.SettingsModule)
      },

      {
        path: 'login-activity',
        loadChildren: () =>
          import('./modules/login-activity/login-activity.module')
            .then(m => m.LoginActivityModule)
      },

      {
        path: 'audit-logs',
        loadChildren: () =>
          import('./modules/audit-logs/audit-logs.module')
            .then(m => m.AuditLogsModule)
      },

    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }