import { Injectable } from '@angular/core';
import { NgProgressRef, NgProgress } from 'ngx-progressbar';

@Injectable({ providedIn: "root" })
export class ProgressBarService {
  private progressRef: { [key: string]: NgProgressRef } = {};

  constructor(private ngProgress: NgProgress) {}

  createProgressBar(name: string): void {
    this.progressRef[name] = this.ngProgress.ref();
  }

  start(name: string): void {
    if (!this.progressRef[name]) {
      this.createProgressBar(name);
    }
    this.progressRef[name].start();
  }

  complete(name: string): void {
    if (this.progressRef[name]) {
      this.progressRef[name].complete();
      delete this.progressRef[name];
    }
  }
}
