import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { AppWhitelistRoutingModule } from './app-whitelist-routing.module';

import { AppWhitelistComponent } from './app-whitelist.component';

import { SharedModule } from '../../shared/shared.module';
import { AddTemplateComponent } from './add-template/add-template.component';

@NgModule({

  declarations: [

    AppWhitelistComponent,
     AddTemplateComponent

  ],

  imports: [

    CommonModule,

    FormsModule,

    SharedModule,

    AppWhitelistRoutingModule

  ]

})

export class AppWhitelistModule { }