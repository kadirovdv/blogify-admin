import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { ProgressBarService } from '../services/progressbar.service';

@Injectable()
export class HttpRequestInterCeptorLoader implements HttpInterceptor {
  constructor(private progressbar: ProgressBarService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.progressbar.start("httprequestprogressbar");

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.progressbar.complete("httprequestprogressbar");
          }
        },
        () => {
            this.progressbar.complete("httprequestprogressbar");
        }
      )
    );
  }
}
