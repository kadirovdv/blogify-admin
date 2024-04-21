import { NgModule } from '@angular/core';
import { NotFoundPage } from '../pages/notfound/notfound.page';
import { NgProgressModule } from 'ngx-progressbar';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestProgressbarComponent } from './components/http-request-progressbar/http-request-progressbar.componenr';
import { NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    NgProgressModule,
    HttpClientModule,
    NgbToastModule,
    NgbTooltipModule,
  ],
  declarations: [NotFoundPage, HttpRequestProgressbarComponent],
  exports: [
    NotFoundPage,
    HttpRequestProgressbarComponent,
    NgProgressModule,
    HttpClientModule,
    NgbToastModule,
    NgbTooltipModule,
  ],
  providers: [],
})
export class SharedModule {}
