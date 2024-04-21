import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  constructor(
    private title: Title
  ) {
    this.title.setTitle('Dashboard | Blogify');
  }

  ngOnInit(): void {
   
  }
}
