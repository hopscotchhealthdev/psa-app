import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-preview-dailog',
  templateUrl: './preview-dailog.component.html',
  styleUrls: ['./preview-dailog.component.scss']
})
export class PreviewDailogComponent implements OnInit {
  @Input() psaId: string;
  @Input() videoId: string;
  @Input() url: string;
  @Input() buttonText: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public perform() {

    this.activeModal.close({
      psaId: this.psaId,
      videoId: this.videoId
    });
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}