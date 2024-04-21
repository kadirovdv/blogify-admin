import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPage } from './core/pages/notfound/notfound.page';
import { AuthGuardAuthCheck } from './core/shared/guards/auth.guard';
import { CheckIfMatchesGuard } from './core/shared/guards/check.if.matches.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./core/dashboard/dashboard.module').then(
        (module) => module.DashboardModule
      ),
    canActivate: [AuthGuardAuthCheck],
  },
  { path: '**', component: NotFoundPage, canActivate: [CheckIfMatchesGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
