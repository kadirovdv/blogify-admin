import { NgModule } from '@angular/core';
import { NotFoundPage } from '../pages/notfound/notfound.page';
import { RouterProgressbar } from './components/routers-progressbar/routers-progressbar.component';
import { NgProgressModule } from 'ngx-progressbar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpRequestInterCeptorLoader } from './interceptors/http-request-progressbar.interceptor';
import { HttpRequestProgressbarComponent } from './components/http-request-progressbar/http-request-progressbar.componenr';
import { HttpRequestInterCeptorToken } from './interceptors/http-request-send-token.interceptor';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [NgProgressModule, HttpClientModule, NgbToastModule],
  declarations: [
    NotFoundPage,
    RouterProgressbar,
    HttpRequestProgressbarComponent,
  ],
  exports: [
    NotFoundPage,
    RouterProgressbar,
    HttpRequestProgressbarComponent,
    NgProgressModule,
    HttpClientModule,
    NgbToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterCeptorLoader,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterCeptorToken,
      multi: true,
    }
  ],
})
export class SharedModule {}
