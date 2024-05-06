import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';

@Component({
  selector: 'app-dashboard-blog-posts',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss', '../../styles/styles.scss'],
})
export class RequestsPage implements OnInit {
  constructor(private setNavbarTitle: SetNabvarTitleService) {
    this.setNavbarTitle.setTitle('Requests');
  }
  ngOnInit(): void {}
}
