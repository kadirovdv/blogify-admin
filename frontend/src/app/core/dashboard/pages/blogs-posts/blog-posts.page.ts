import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';

@Component({
  selector: 'app-dashboard-blog-posts',
  templateUrl: './blog-posts.page.html',
  styleUrls: ['./blog-posts.page.scss', '../../styles/styles.scss'],
})
export class BlogPostsPage implements OnInit {
  constructor(private setNavbarTitle: SetNabvarTitleService) {
    this.setNavbarTitle.setTitle('Blog-Posts');
  }
  ngOnInit(): void {}
}
