import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./model.component.scss'],
})
export class ModalComponent {
  public title = 'Modal';
  public negative = null;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  setModalProps(props: any) {
    this.title = props.title;
    this.negative = props.negative;
  }
}
