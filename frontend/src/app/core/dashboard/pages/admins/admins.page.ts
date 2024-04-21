import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';
import { APIService } from 'src/app/core/shared/services/api.service';

@Component({
  selector: 'app-dashboard-admins',
  templateUrl: './admins.page.html',
  styleUrls: ['./admins.page.scss'],
})
export class AdminsPage implements OnInit {
  adminList: Array<any> = [];
  adminRolesCount: any = {};
  adminRolesList: Array<any> = [];

  constructor(
    private setNavbarTitle: SetNabvarTitleService,
    private apiService: APIService
  ) {
    this.setNavbarTitle.setTitle('Admins');
  }

  ngOnInit(): void {
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
}