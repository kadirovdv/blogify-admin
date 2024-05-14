import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdminAuthService } from 'src/app/core/shared/services/admin.auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() isSidebarVisible = false;

  constructor(public authService: AdminAuthService) {}
  ngOnInit() {}

  toggle() {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.toggleSidebar.emit(this.isSidebarVisible);
    localStorage.setItem(
      'isSidebarVisible',
      JSON.stringify(this.isSidebarVisible)
    );
  }
}
