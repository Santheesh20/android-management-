import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AuditLogsRoutingModule } from './audit-logs-routing.module';
import { AuditLogsComponent } from './audit-logs.component';

@NgModule({
  declarations: [AuditLogsComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AuditLogsRoutingModule
  ]
})
export class AuditLogsModule { }
