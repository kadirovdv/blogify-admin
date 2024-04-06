import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError as observableError } from 'rxjs';
import { Router } from '@angular/router';
import { AdminAuthService } from '../services/admin.auth.service';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class HttpRequestInterCeptorToken implements HttpInterceptor {
  constructor(
    private authService: AdminAuthService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const adminToken = this.authService.getToken();

    let requestHeader = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (adminToken && !this.document.location.origin + '/api/admin/login') {
      requestHeader = requestHeader.append(
        'Authorization',
        `Bearer ${adminToken}`
      );
    }

    let adminRequest = req.clone({
      headers: requestHeader,
    });

    return next.handle(adminRequest).pipe(
      catchError((error) => {
        if (error.status == 401 || error.status == 0 || error.status == 403) {
          if (!req.url.includes('/login')) {
            alert('Please login');
          }
          this.router.navigate(['/auth/login']).then();
        }
        return observableError(() => error);
      })
    );
  }
}
