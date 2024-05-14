import { Component, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';
import { AdminAuthService } from 'src/app/core/shared/services/admin.auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { generateRandom } from 'src/app/core/shared/functions/generate.random.creds';
import { APIService } from 'src/app/core/shared/services/api.service';

@Component({
  selector: 'ap-create-admin',
  templateUrl: './create.admin.page.html',
  styleUrls: ['./create.admin.page.scss', '../../styles/styles.scss'],
})
export class CreateAdminPage {
  @ViewChild('fileInput') fileInput: ElementRef | any;
  viewImg: string = '';
  togglePasswordVisibility: boolean = false;
  togglePasswordConfirmVisibility: boolean = false;

  createAdminForm: FormGroup;

  constructor(
    private setNavbarTitle: SetNabvarTitleService,
    private title: Title,
    private toastr: ToastrService,
    public authServie: AdminAuthService,
    private apiService: APIService
  ) {
    this.setNavbarTitle.setTitle('Create New Admin');
    this.title.setTitle('Create New Admin | Blogify');

    this.createAdminForm = new FormGroup({
      username: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(10),
      ]),
      email: new FormControl({ value: '', disabled: false }, [
        Validators.email,
      ]),
      roles: new FormControl({ value: '', disabled: false }, [
        Validators.required,
      ]),
      password: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(20),
      ]),
      passwordConfirm: new FormControl({ value: '', disabled: false }, [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  openInput() {
    this.fileInput.nativeElement.click();
  }

  imgSelect(event: any) {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.viewImg = reader.result as string;
      };
    } else {
      this.toastr.info('', 'Only images can be loaded!');
      return;
    }
  }

  randomize() {
    let username = `user_${generateRandom(7)}`;
    let email = `user_${generateRandom(5)}@gmail.com`;
    let password = `a.${generateRandom(15)}`;
    let passwordConfirm = password;

    const superAdminsAllowed = [
      'ADMIN-CONTROLLER',
      'SUPER-ADMIN',
      'ADMIN',
      'MODERATOR',
    ];
    const adminsAllowed = ['ADMIN', 'MODERATOR'];

    this.togglePasswordVisibility = true;
    this.togglePasswordConfirmVisibility = true;

    if (
      this.authServie.getRole() !== 'ADMIN-CONTROLLER' &&
      this.authServie.getRole() !== 'SUPER-ADMIN'
    ) {
      const randomIndex = Math.floor(Math.random() * adminsAllowed.length);
      const randomString = adminsAllowed[randomIndex];
      this.createAdminForm.setValue({
        username: username,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        roles: randomString,
      });
    } else {
      const randomIndex = Math.floor(Math.random() * superAdminsAllowed.length);
      const randomString = superAdminsAllowed[randomIndex];
      this.createAdminForm.setValue({
        username: username,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        roles: randomString,
      });
    }
  }

  submit() {
    this.createAdminForm.disable();
    this.apiService.createAdmin(this.createAdminForm.value).subscribe(
      () => {
        this.toastr.success('Admin created successfully', 'Success');
        this.createAdminForm.reset();
        this.viewImg = '';
        this.togglePasswordVisibility = false;
        this.togglePasswordConfirmVisibility = false;
        this.createAdminForm.enable();
      },
      (_) => {
        this.toastr.error(_.error.message, 'Failed');
        this.createAdminForm.enable();
      }
    );
  }

  setAdminRole(event: any) {
    this.createAdminForm.controls['roles'].setValue(event.target.value);
  }
}
