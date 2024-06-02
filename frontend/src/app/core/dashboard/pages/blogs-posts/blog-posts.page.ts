import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';
import { APIService } from 'src/app/core/shared/services/api.service';

@Component({
  selector: 'app-dashboard-blog-posts',
  templateUrl: './blog-posts.page.html',
  styleUrls: ['./blog-posts.page.scss', '../../styles/styles.scss'],
})
export class BlogPostsPage implements OnInit {
  constructor(
    private setNavbarTitle: SetNabvarTitleService,
    private apiService: APIService
  ) {
    this.setNavbarTitle.setTitle('Blog-Posts');
  }
  ngOnInit(): void {
    this.getBlogPosts()
  }

  getBlogPosts() {
    this.apiService.getPosts().subscribe((res) => {
      console.log(res);
    });
  }
}
