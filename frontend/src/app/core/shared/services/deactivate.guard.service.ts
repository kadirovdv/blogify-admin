import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DeactivationService {
  private deactivation = false;

  constructor() {}

  setDeactivation() {
    this.deactivation = true;
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('adminID');
  }

  hasDeactivation() {
    return this.deactivation;
  }
}
