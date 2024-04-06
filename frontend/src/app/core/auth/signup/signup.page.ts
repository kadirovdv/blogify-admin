import { Component, OnInit } from '@angular/core';
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
    private toastr: ToastrService
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
        },
        (_) => {
          this.toastr.error(_.error.message, 'Failed');
        }
      );
  }
  ngOnInit(): void {
    this.authService.logout()
  }
}
