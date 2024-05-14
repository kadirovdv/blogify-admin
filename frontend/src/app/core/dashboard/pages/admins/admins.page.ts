import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';
import { APIService } from 'src/app/core/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Admin } from 'src/app/core/shared/interfaces/admin.interface';
import { AdminAuthService } from 'src/app/core/shared/services/admin.auth.service';
import { ModalService } from 'src/app/core/shared/services/modal.service';
import { Title } from '@angular/platform-browser';
import { AdminDeleteModal } from '../../../shared/components/modals/admin-delete-modal/admin.delete.modal';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminDeleteByIdModal } from 'src/app/core/shared/components/modals/admin-delete-byid/admin.delete.by.id.modal';

@Component({
  selector: 'app-dashboard-admins',
  templateUrl: './admins.page.html',
  styleUrls: ['./admins.page.scss', '../../styles/styles.scss'],
})
export class AdminsPage implements OnInit {
  public loading: boolean = false;

  // Vars to fetch admin-list
  adminList: Array<any> = [];
  public adminRoles: any = {};

  // Vars to block an admin
  adminIDToBlock: string = '';
  public adminID: string | null = sessionStorage.getItem('adminID');

  // Vars to delete an admin
  public adminRoleToDelete: string = null || '';

  // Vars for modal

  constructor(
    private setNavbarTitle: SetNabvarTitleService,
    private apiService: APIService,
    public authService: AdminAuthService,
    private toastr: ToastrService,
    private title: Title,
    private modalService: ModalService
  ) {
    this.setNavbarTitle.setTitle('Admins');
    this.title.setTitle('Admins | Blogify');
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
      (admins: any) => {
        this.adminList.push(...admins.admins);
        this.adminRoles = {
          ADMIN: 0,
          MODERATOR: 0,
          'SUPER-ADMIN': 0,
          'ADMIN-CONTROLLER': 0,
        };
        this.adminRoles = this.countAdminRoles(admins.admins);
        this.loading = false;
      },

      (_) => {
        this.toastr.error(_.error.message, 'Failed to fetch');
      }
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

  openDeleteAllAdminModal() {
    const props = { title: this.adminRoleToDelete };
    this.modalService.setProps(props);

    this.modalService.open(AdminDeleteModal, { size: 'md' }).then(
      (result) => {
        this.getAdmins();
      },
      (reason) => {
        this.getAdmins();
      }
    );
  }

  openDeleteAdminByIdModal() {
    const props = { id: this.adminID };

    this.modalService.setProps(props);
    this.modalService.open(AdminDeleteByIdModal, { size: 'md' }).then(
      (result) => {
        setTimeout(() => {
          this.getAdmins();
        }, 100);
      },
      (reason) => {
        setTimeout(() => {
          this.getAdmins();
        }, 100);
      }
    );
  }
}
