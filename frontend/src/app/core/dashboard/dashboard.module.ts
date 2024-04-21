import { NgModule } from '@angular/core';
import { DashboardPage } from './dashboard.page';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarHeaderComponent } from './components/sidebar-header/sidebar.header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SetNabvarTitleService } from './services/set.navbar.title.service';
import { AdminsPage } from './pages/admins/admins.page';

@NgModule({
  declarations: [
    DashboardPage,
    SidebarComponent,
    SidebarHeaderComponent,
    NavbarComponent,
    AdminsPage
  ],
  imports: [
    DashboardRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [DashboardPage],
  providers: [SetNabvarTitleService],
})
export class DashboardModule {}
