import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../services/admin.auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuardDisableIfAuth implements CanActivate {
  constructor(
    private authService: AdminAuthService,
    private toatr: ToastrService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authService.getToken()) {
      return true;
    } else {
      this.toatr.info('You are currently authenticated!', 'Info', {});
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
