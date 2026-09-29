import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsComponent } from './organizations.component';
import { UserComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';

@NgModule({
  declarations: [
    OrganizationsComponent,
    UserComponent,
    RolesComponent,
    AddOrganizationComponent,
    AddUserComponent,
    AddRoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    OrganizationsRoutingModule
  ]
})
export class OrganizationsModule { }