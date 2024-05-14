import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-go-back',
  template: `<div (click)="goBack()" class="mb-2 cursor-pointer">
    <img src="/assets/images/arrow.left.svg" alt="arrow left" />
</div>`,
  styleUrls: ['./go.back.component.scss'],
})
export class GoBackComponent {
  constructor(public location: Location) {}
  goBack() {
    this.location.historyGo(-1);
  }
}
