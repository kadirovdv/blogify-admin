import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminAuthService } from '../../shared/services/admin.auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../styles/auth.styles.scss', '../auth.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  togglePasswordVisibility: boolean = false;

  constructor(
    private title: Title,
    private authService: AdminAuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.title.setTitle('Login | Blogify');

    this.loginForm = new FormGroup({
      enterby: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  ngOnInit(): void {
    this.authService.logout();
  }

  checkIfValueEmail(value: string): boolean {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value);
  }

  login() {
    this.authService
      .login(
        this.checkIfValueEmail(this.loginForm.value['enterby'])
          ? {
              email: this.loginForm.value['enterby'],
              password: this.loginForm.value['password'],
            }
          : {
              username: this.loginForm.value['enterby'],
              password: this.loginForm.value['password'],
            }
      )
      .subscribe(
        (admin) => {
          sessionStorage.setItem('adminID', admin.admin._id);
          sessionStorage.setItem('token', admin.token);
          this.toastr.success(
            `Welcome back, ${admin.admin.username}!`,
            'Success'
          );
          this.router.navigate(['/dashboard']);
        },
        (_) => {
          this.toastr.error(_.error.message, 'Failed');
        }
      );
  }

}
