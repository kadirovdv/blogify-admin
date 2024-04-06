import { NgModule } from '@angular/core';
import { DashboardPage } from './dashboard.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  declarations: [DashboardPage],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [DashboardPage],
  providers: [],
})
export class DashboardModule {}
