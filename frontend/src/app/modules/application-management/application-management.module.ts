import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ApplicationManagementRoutingModule } from './application-management-routing.module';
import { ApplicationManagementComponent } from './application-management.component';
import { AutoAppUpdateComponent } from './auto-app-update/auto-app-update.component';
import { UploadAppsComponent } from './upload-apps/upload-apps.component';

@NgModule({
  declarations: [
    ApplicationManagementComponent,
    AutoAppUpdateComponent,
    UploadAppsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ApplicationManagementRoutingModule
  ]
})
export class ApplicationManagementModule { }