import { Component } from '@angular/core';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from '../../../services/modal.service';
import { APIService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-delete-modal',
  templateUrl: './admin.delete.modal.html',
  styleUrls: ['./admin.delete.modal.scss'],
})
export class AdminDeleteModal {
  constructor(
    public modal: NgbActiveModal,
    public modalService: ModalService,
    private apiService: APIService,
    private toastr: ToastrService
  ) {}

  deleteAdminByRole() {
    this.apiService
      .deleteAdminByRole(this.modalService.getProps().title)
      .subscribe(
        (result) => {
          this.toastr.info(result.message, 'Deleted Admins');          
        },
        (_) => {
          this.toastr.error(_.error.message, 'Failed to delete');
        }
      );
  }

  ngOnInit(): void {}
}
