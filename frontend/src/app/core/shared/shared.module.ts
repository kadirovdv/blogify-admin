import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundPage } from '../pages/notfound/notfound.page';
import { NgProgressModule } from 'ngx-progressbar';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestProgressbarComponent } from './components/http-request-progressbar/http-request-progressbar.componenr';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AdminDeleteModal } from './components/modals/admin-delete-modal/admin.delete.modal';
import { GoBackComponent } from './components/go-back/go.back.component';
import { AdminDeleteByIdModal } from './components/modals/admin-delete-byid/admin.delete.by.id.modal';

@NgModule({
  imports: [
    NgProgressModule,
    HttpClientModule,
    NgbToastModule,
    TooltipModule,
    NgxSkeletonLoaderModule,
    NgbModule,
  ],
  declarations: [
    NotFoundPage,
    HttpRequestProgressbarComponent,
    AdminDeleteModal,
    AdminDeleteByIdModal,
    GoBackComponent,
  ],
  exports: [
    NotFoundPage,
    HttpRequestProgressbarComponent,
    AdminDeleteModal,
    AdminDeleteByIdModal,
    GoBackComponent,
    NgProgressModule,
    HttpClientModule,
    NgbToastModule,
    TooltipModule,
    NgxSkeletonLoaderModule,
    NgbModule,
  ],
  providers: [],
})
export class SharedModule {}
