import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrganizationsComponent } from './organizations.component';
import { UserComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'roles',
    component: RolesComponent
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
export class OrganizationsRoutingModule { }