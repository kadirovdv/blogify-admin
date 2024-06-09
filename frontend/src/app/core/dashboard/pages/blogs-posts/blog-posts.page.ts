import { Component, OnInit } from '@angular/core';
import { SetNabvarTitleService } from '../../services/set.navbar.title.service';
import { APIService } from 'src/app/core/shared/services/api.service';

@Component({
  selector: 'app-dashboard-blog-posts',
  templateUrl: './blog-posts.page.html',
  styleUrls: ['./blog-posts.page.scss', '../../styles/styles.scss'],
})
export class BlogPostsPage implements OnInit {
  public loading: boolean = false;
  public deleteByGroupMode: boolean = false;

  blogPosts: Array<any> = [];


  constructor(
    private setNavbarTitle: SetNabvarTitleService,
    private apiService: APIService
  ) {
    this.setNavbarTitle.setTitle('Blog-Posts');
  }
  ngOnInit(): void {
    this.getBlogPosts();
  }

  getBlogPosts() {
    this.loading = true;
    this.blogPosts = [];
    this.apiService.getPosts().subscribe((blogPosts: any) => {
      this.blogPosts.push(...blogPosts.blogPosts);
      this.loading = false;
    });
  }
}
