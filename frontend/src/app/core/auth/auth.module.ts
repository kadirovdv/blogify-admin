import { NgModule } from '@angular/core';
import { LoginPage } from './login/login.page';
import { AuthRoutingModule } from './auth.routing.module';
import { JustifyCenterComponent } from '../shared/components/justify-center/justify-center.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignupPage } from './signup/signup.page';
import { AuthPage } from './auth.page';
import { ForgotPasswordPage } from './forgotpassword/forgot.password.page';

@NgModule({
  declarations: [LoginPage, SignupPage, AuthPage, ForgotPasswordPage, JustifyCenterComponent],
  imports: [AuthRoutingModule, CommonModule, ReactiveFormsModule, SharedModule],
  exports: [AuthPage],
  providers: [],
  bootstrap: [],
})
export class AuthModule {}
