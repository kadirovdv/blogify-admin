import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { ProgressBarService } from '../../services/progressbar.service';

@Component({
  selector: 'app-router-progress-bar',
  templateUrl: './routers-progressbar.component.html',
  styleUrls: ['./routers-progressbar.component.scss'],
})
export class RouterProgressbar implements OnInit {
  constructor(private router: Router, private progressbar: ProgressBarService) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.progressbar.start('routerpregressbar');
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.progressbar.complete('routerpregressbar');
          break;
        }
        default: {
          break;
        }
      }
    });
  }
  ngOnInit() {}
}
