import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var anime:any;
@Component({
  selector: 'app-text-dailog',
  templateUrl: './text-dailog.component.html',
  styleUrls: ['./text-dailog.component.scss']
})
export class TextDailogComponent implements OnInit {
  titleText: string;
  @Input() set title(value) {

    //animation effect
   //https://tobiasahlin.com/moving-letters/
    this.titleText=value;
  /*  var textWrapper = document.querySelector('.ml2');
    textWrapper.innerHTML = value.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline({loop: true})
    .add({
      targets: '.ml2 .letter',
      scale: [4,1],
      opacity: [0,1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 950,
      delay: (el, i) => 70*i
    }).add({
      targets: '.ml2',
      opacity: 0,
      duration: 500,
      easing: "easeOutExpo",
      delay: 500
    });   
    */
}
  @Input() message: string;
  @Input() btnOkText: string;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  public ok() {
    this.activeModal.close(true);
  }


}