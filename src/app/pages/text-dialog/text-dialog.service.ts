import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TextDailogComponent } from './text-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class TextDailogService {

  constructor(private modalService: NgbModal) { }

  public open(
    title: string,
    message: string,
    btnOkText: string = 'Yes',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(TextDailogComponent, { size: dialogSize,backdrop : 'static',
    keyboard : false });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    return modalRef.result;
  }
}