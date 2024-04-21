import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CheckIfMatchesGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const included = [
      '/signup',
      '/login',
      '/signin',
      '/auth',
      '/authentication',
      '/authorization',
    ];
    const currentRoute = state.url;
    const navigateIf = included.includes(currentRoute);

    if (navigateIf) {
      this.router.navigate(['/auth/login']);
    } else {
      return true;
    }

    return navigateIf;
  }
}
