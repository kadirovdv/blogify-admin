import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminAuthService } from '../../shared/services/admin.auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../styles/auth.styles.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;

  constructor(
    private title: Title,
    private authService: AdminAuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.title.setTitle('Signup | Blog');

    this.signupForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      email: new FormControl('', [Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
      passwordConfirm: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  signup() {
    this.authService
      .signup({
        username: this.signupForm.value['username'],
        email: this.signupForm.value['email'],
        password: this.signupForm.value['password'],
        passwordConfirm: this.signupForm.value['passwordConfirm'],
      })
      .subscribe(
        (admin) => {
          this.toastr.success('You are signup up', 'Success');
          this.router.navigate(['/dashboard']);
        },
        (_) => {
          this.toastr.error(_.error.message, 'Failed');
        }
      );
  }

  generateRandom(length: number): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  signupAsGuest() {
    const username = `user_${this.generateRandom(7)}`;
    const email = `user_${this.generateRandom(5)}@gmail.com`;
    const password = `p.${this.generateRandom(15)}`;
    const passwordConfirm = password;

    this.authService
      .signup({ username, email, password, passwordConfirm })
      .subscribe(
        (admin) => {
          sessionStorage.setItem('adminID', admin.admin._id);
          sessionStorage.setItem('token', admin.token);
          this.router.navigate(['/dashboard']);
        },
        (_) => {
          this.toastr.error(_.error.message, 'Failed');
        }
      );
  }

  ngOnInit(): void {
    this.authService.logout();
  }
}
