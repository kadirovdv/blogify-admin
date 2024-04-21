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
import { ToastrService } from 'ngx-toastr';
import { DeactivationService } from '../services/deactivate.guard.service';

@Injectable()
export class HttpRequestInterCeptorToken implements HttpInterceptor {
  constructor(
    private authService: AdminAuthService,
    private router: Router,
    private toastr: ToastrService,
    private deactive: DeactivationService,
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
          this.deactive.setDeactivation();
          if (!req.url.includes('/login')) {
            this.toastr.warning(error.error.message, 'Login required');
          }
          this.router.navigate(['/auth/login']).then((response) => {});
        }
        return observableError(() => error);
      })
    );
  }
}
