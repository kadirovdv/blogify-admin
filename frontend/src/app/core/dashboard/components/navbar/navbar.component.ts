import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  styles: []
})
export class NavbarComponent implements OnInit {
  title: string = '';
  constructor(public setNavbarTitle: SetNabvarTitleService) {}

  ngOnInit(): void {
    this.setNavbarTitle.string$.subscribe((title) => (this.title = title));
  }
}
