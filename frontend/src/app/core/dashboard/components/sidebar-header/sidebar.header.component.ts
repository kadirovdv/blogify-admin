import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-header',
  templateUrl: './sidebar.header.component.html',
  styleUrls: ['./sidebar.header.component.scss'],
})
export class SidebarHeaderComponent implements OnInit {
  @Input() isSidebarVisible: any;

  constructor() {}
  ngOnInit(): void {
    
  }
}
