import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-text-dailog',
  templateUrl: './text-dailog.component.html',
  styleUrls: ['./text-dailog.component.scss']
})
export class TextDailogComponent implements OnInit {
  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public ok() {
    this.activeModal.close(true);
  }


}