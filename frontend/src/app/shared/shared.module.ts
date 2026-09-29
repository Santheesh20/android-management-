import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { DropdownComponent } from './utilities/dropdown/dropdown.component';

@NgModule({

  declarations: [

    LayoutComponent,
    SidenavComponent,
    DataTableComponent,
    PageHeaderComponent,
    FeatureCardComponent,
    EmptyStateComponent,
    DropdownComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ],

  exports: [
    CommonModule,
    RouterModule,
    LayoutComponent,
    SidenavComponent,
    DataTableComponent,
    PageHeaderComponent,
    FeatureCardComponent,
    EmptyStateComponent,
    DropdownComponent
  ]

})

export class SharedModule { }