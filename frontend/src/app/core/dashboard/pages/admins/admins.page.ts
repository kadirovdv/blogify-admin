import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';
import { APIService } from 'src/app/core/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/core/shared/interfaces/admin.interface';
import { AdminAuthService } from 'src/app/core/shared/services/admin.auth.service';
import { ModalService } from 'src/app/core/shared/services/modal.service';

@Component({
  selector: 'app-dashboard-admins',
  templateUrl: './admins.page.html',
  styleUrls: ['./admins.page.scss'],
})
export class AdminsPage implements OnInit {
  public loading: boolean = false;

  // Vars to fetch admin-list
  adminList: Array<any> = [];
  public adminRoles: any = {};

  // Vars to block an admin
  adminIDToBlock: string = '';
  public adminID: string | null = sessionStorage.getItem('adminID');

  constructor(
    private setNavbarTitle: SetNabvarTitleService,
    private apiService: APIService,
    public authService: AdminAuthService,
    private toastr: ToastrService
  ) {
    this.setNavbarTitle.setTitle('Admins');
  }

  ngOnInit(): void {
    this.getAdmins();
  }

  countAdminRoles(arr: any[]): object {
    arr.forEach((admin) => {
      switch (admin.roles) {
        case 'ADMIN':
        case 'MODERATOR':
        case 'SUPER-ADMIN':
        case 'ADMIN-CONTROLLER':
          this.adminRoles[admin.roles]++;
          break;
        default:
          break;
      }
    });

    return this.adminRoles;
  }

  getAdmins() {
    this.loading = true;
    this.adminList = [];
    this.apiService.getAdmins().subscribe(
      (admins: Admin[]) => {
        this.adminList.push(...admins);
        this.adminRoles = {
          ADMIN: 0,
          MODERATOR: 0,
          'SUPER-ADMIN': 0,
          'ADMIN-CONTROLLER': 0,
        };
        this.adminRoles = this.countAdminRoles(admins);
        this.loading = false;
      },

      (_) => {}
    );
  }

  openAdminBlockModal(id: string) {
    this.adminIDToBlock = id;
  }

  blockAdminById(id: string) {
    this.apiService.blockAdmin(id).subscribe(
      () => {
        this.getAdmins();
      },
      (_) => {
        this.toastr.error(_.error.message, 'Failed to block');
      }
    );
  }
}
