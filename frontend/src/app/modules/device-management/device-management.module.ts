import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DeviceManagementRoutingModule } from './device-management-routing.module';
import { DeviceManagementComponent } from './device-management.component';
import { DeviceInventoryComponent } from './device-inventory/device-inventory.component';

@NgModule({
  declarations: [
    DeviceManagementComponent,
    DeviceInventoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DeviceManagementRoutingModule
  ]
})
export class DeviceManagementModule { }