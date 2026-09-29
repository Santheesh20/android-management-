import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginActivityRoutingModule } from './login-activity-routing.module';
import { LoginActivityComponent } from './login-activity.component';

@NgModule({
  declarations: [LoginActivityComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    LoginActivityRoutingModule
  ]
})
export class LoginActivityModule { }
