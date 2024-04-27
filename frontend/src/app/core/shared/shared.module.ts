import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundPage } from '../pages/notfound/notfound.page';
import { NgProgressModule } from 'ngx-progressbar';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestProgressbarComponent } from './components/http-request-progressbar/http-request-progressbar.componenr';
import { NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from 'ng2-tooltip-directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    NgProgressModule,
    HttpClientModule,
    NgbToastModule,
    TooltipModule,
    NgxSkeletonLoaderModule,
    NgbModule
  ],
  declarations: [NotFoundPage, HttpRequestProgressbarComponent],
  exports: [
    NotFoundPage,
    HttpRequestProgressbarComponent,
    NgProgressModule,
    HttpClientModule,
    NgbToastModule,
    TooltipModule,
    NgxSkeletonLoaderModule,
    NgbModule
  ],
  providers: [],
})
export class SharedModule {}
