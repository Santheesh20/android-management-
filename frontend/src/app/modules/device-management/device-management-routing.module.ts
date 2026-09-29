import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceManagementComponent } from './device-management.component';
import { DeviceInventoryComponent } from './device-inventory/device-inventory.component';

const routes: Routes = [
  {
    path: '',
    component: DeviceManagementComponent
  },
  {
    path: 'inventory',
    component: DeviceInventoryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DeviceManagementRoutingModule { }