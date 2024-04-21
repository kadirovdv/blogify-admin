import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AdminAuthService } from '../services/admin.auth.service';
import { ToastrService } from 'ngx-toastr';
import { DeactivationService } from '../services/deactivate.guard.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardDisableIfAuth implements CanActivate {
  constructor(
    private authService: AdminAuthService,
    private toatr: ToastrService,
    private router: Router,
    private deactivate: DeactivationService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.deactivate.hasDeactivation()) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('adminID');
      return true;
    } else {
      if (!this.authService.getToken()) {
        return true;
      } else {
        this.toatr.info('You are currently authenticated!', 'Info', {});
        this.router.navigate(['/dashboard']);
        return false;
      }
    }
  }
}
