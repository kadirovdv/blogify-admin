import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AdminAuthService } from '../services/admin.auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AdminAliveCheckInterceptor implements HttpInterceptor {
  constructor(
    private authService: AdminAuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const adminID = sessionStorage.getItem('adminID');
    if (adminID) {
      return this.authService.getCurrentAdmin(adminID).pipe(
        tap((exists) => {
          if (!exists) {
            console.log('asd');
          }
        })
      );
    }
    return next.handle(req);
  }
}
