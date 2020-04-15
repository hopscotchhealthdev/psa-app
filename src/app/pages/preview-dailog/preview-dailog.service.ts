import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PreviewDailogComponent } from './preview-dailog.component';

@Injectable({
  providedIn: 'root'
})
export class PreviewDailogService {

  constructor(private modalService: NgbModal) { }

  public open(
    psaId: string,
    videoId: string,
    url: string,
    buttonText: string = '',
    dialogSize: 'sm' | 'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(PreviewDailogComponent, {
      size: dialogSize, backdrop: 'static',
      keyboard: false,
      centered:true
    });
    modalRef.componentInstance.psaId = psaId;
    modalRef.componentInstance.videoId = videoId;
    modalRef.componentInstance.url = url;
    modalRef.componentInstance.buttonText = buttonText;
    return modalRef.result;
  }
}