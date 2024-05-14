import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { APIService } from '../../../services/api.service';
import { ModalService } from '../../../services/modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-delete-by-id-modal',
  templateUrl: './admin.delete.by.id.html',
  styleUrls: ['./admin.delete.by.id.modal.scss'],
})
export class AdminDeleteByIdModal {
  constructor(
    public modal: NgbActiveModal,
    public modalService: ModalService,
    private apiService: APIService,
    private toastr: ToastrService
  ) {}

  deleteAdminById() {
    this.apiService.deleteAdminById(this.modalService.getProps().id).subscribe(
      (result) => {
        console.log(result);
        
        this.toastr.info(result.message, 'Deleted Admins');
      },
      (_) => {
        this.toastr.error(_.error.message, 'Failed to delete',);
      }
    );
  }
}
