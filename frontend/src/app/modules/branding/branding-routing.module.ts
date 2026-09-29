import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandingComponent } from './branding.component';

const routes: Routes = [
  {
    path: '',
    component: BrandingComponent
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
export class BrandingRoutingModule {}