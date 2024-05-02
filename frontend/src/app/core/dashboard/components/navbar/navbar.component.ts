import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';
import { AdminAuthService } from 'src/app/core/shared/services/admin.auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  styles: []
})
export class NavbarComponent implements OnInit {
  title: string = '';
  constructor(public setNavbarTitle: SetNabvarTitleService, public authService: AdminAuthService, public router: Router) {}

  ngOnInit(): void {
    this.setNavbarTitle.string$.subscribe((title) => (this.title = title));
  }
}
