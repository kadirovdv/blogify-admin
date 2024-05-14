import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  props: any;
  constructor(public ngbModal: NgbModal) {}

  setProps(props: any) {
    return (this.props = props);
  }
  getProps() {
    return this.props;
  }

  open(
    modalComponent: any,
    options: NgbModalOptions
  ): Promise<any> {
    const modal = this.ngbModal.open(modalComponent, options);
    
    return modal.result;
  }
}
