import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../components/modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: any;

  constructor(private ngbModal: NgbModal) {}

  open(props: any): Promise<any> {
    this.modalRef = this.ngbModal.open(ModalComponent, {
      size: props.size,
      backdrop: 'static',
    });

    return this.modalRef.result;
  }
}
