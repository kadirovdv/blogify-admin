import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SetNabvarTitleService {
  public initialValue = new BehaviorSubject<string>("");
  public string$ = this.initialValue.asObservable();

  constructor() {}

  setTitle(title: string) {
    this.initialValue.next(title);
  }
}
