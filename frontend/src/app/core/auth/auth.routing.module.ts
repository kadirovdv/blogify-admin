import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPage } from './login/login.page';
import { SignupPage } from './signup/signup.page';
import { ForgotPasswordPage } from './forgotpassword/forgot.password.page';
import { AuthPage } from './auth.page';
import { AuthGuardDisableIfAuth } from '../shared/guards/disable.auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'login',
        component: LoginPage,
        canActivate: [AuthGuardDisableIfAuth],
      },
      {
        path: 'signup',
        component: SignupPage,
        canActivate: [AuthGuardDisableIfAuth],
      },
      { path: 'forgot-password', component: ForgotPasswordPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
