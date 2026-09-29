import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppWhitelistComponent } from './app-whitelist.component';

const routes: Routes = [
  {
    path: '',
    component: AppWhitelistComponent
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
export class AppWhitelistRoutingModule { }