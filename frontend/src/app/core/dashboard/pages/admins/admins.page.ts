import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';
import { APIService } from 'src/app/core/shared/services/api.service';

@Component({
  selector: 'app-dashboard-admins',
  templateUrl: './admins.page.html',
  styleUrls: ['./admins.page.scss'],
})
export class AdminsPage implements OnInit {
  // Vars to fetch admin-list
  adminList: Array<any> = [];
  adminRolesCount: any = {};
  adminRolesList: Array<any> = [];

  // Vars to block an admin
  adminIDToBlock: string = '';

  constructor(
    private setNavbarTitle: SetNabvarTitleService,
    private apiService: APIService
  ) {
    this.setNavbarTitle.setTitle('Admins');
  }

  ngOnInit(): void {
    this.getAdmins();
  }

  getAdmins() {
    this.adminList = [];
    this.apiService.getAdmins().subscribe(
      (admins) => {
        this.adminList.push(...admins);
        // return this.adminList.forEach((admin) => {
        //   return [
        //     this.adminRolesCount[admin.roles] = (this.adminRolesCount[admin.roles] || 0) + 1,
        //     this.adminRolesList.push(this.adminRolesCount)
        //   ]
        // });
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
        console.log(_.error.message);
      }
    );
  }
}
