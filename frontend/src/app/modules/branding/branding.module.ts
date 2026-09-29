import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrandingComponent } from './branding.component';
import { BrandingRoutingModule } from './branding-routing.module';
import { AddBrandingComponent } from './add-branding/add-branding.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BrandingComponent,
    AddBrandingComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
    BrandingRoutingModule,
    SharedModule
  ]
})
export class BrandingModule { }