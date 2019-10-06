import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  template: `
  <ng-template #content let-modal>
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title"><i class="fa fa-trash"></i> Delete Book</h4>
    <button type="button" class="close" aria-label="Close" (click)="modal.dismiss(false)">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p>Are you sure you want to delete <strong>{{bookTitle}} ?</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" (click)="modal.close(true)">yes</button>
    <button type="button" class="btn btn-primary" (click)="modal.close(false)">No</button>
  </div>
</ng-template>

<button type="button" class="btn btn-outline-danger" (click)="open(content)">
<i class="fa fa-trash"></i> Delete
</button>
  `,
  styles: []
})
export class ModalComponent implements OnInit {
  @Input() bookTitle: string;
  @Output() eventClick = new EventEmitter();
  delete: boolean;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  open(content) {
    this.modalService.open(content).result.then(result => {
      this.delete = result;
    }, reason => {
      this.delete = reason;
    }).then( end =>  this.eventClick.emit(this.delete));
  }

}
