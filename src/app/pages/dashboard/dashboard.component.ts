import { Router, NavigationExtras } from '@angular/router';
import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import * as firebase from 'firebase';
import * as moment from "moment";
import { ConfirmationDailogService } from '../confirmation-dailog/confirmation-dailog.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  providers:[NgbActiveModal]
})
export class DashboardComponent implements OnInit {
  @ViewChild('videoPlay') videoPlay;
  recordRTC: any;
  collection = [];
  p: number = 1;
  videos: any = [];
  modalRef:any;
  constructor(private router: Router,public activeModal: NgbActiveModal, private confirmationDialogService: ConfirmationDailogService,public modalService: NgbModal) {

  }
  download(url) {
    this.recordRTC.save(url);
  }

  share(url) {
    console.log(url)
  }
  ngOnInit() {
    let queryUnsubscribe: any;
    let me = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("users").doc(user.uid).collection("videos").where("userId", "==", user.uid).onSnapshot(sessionSnap => {
            console.log(sessionSnap)
            sessionSnap.docChanges().forEach(change => {

              if (change.type === "added") {
                var data = change.doc.data();
                me.videos.push({
                  date: moment(new Date(data.createdDate)).format('LLLL'),
                  url: data.url,
                  videoId: change.doc.id
                })
              }
              if (change.type === "modified") {

              }
              if (change.type === "removed") {
                let index = this.videos.findIndex(o => o.videoId == change.doc.id);
                if (index > -1) {
                  this.videos.splice(index, 1);
                }
              }
            })
          });
      }
    })
  }

  play(url,template: TemplateRef<any>) {
    this.modalRef=this.modalService.open(template);
  let me =this;
  setTimeout(() => {
    let el:any=document.getElementById("videoPlay");
    el.src=url;
  }, 400);

}
hide(template: TemplateRef<any>){
  this.modalService.dismissAll(template);
  
}
  delete(item) {
    this.shwDeletePrompt(item, "Are you want to delete this video?", "", "Yes", "No");
  }
  public shwDeletePrompt(item, title, message, btnOkText, btnCancelText) {
    this.confirmationDialogService.confirm(title, message, btnOkText, btnCancelText)
      .then((confirmed) => {
        if (confirmed) {
          firebase
            .firestore()
            .collection("users").doc(firebase.auth().currentUser.uid).collection("videos").doc(item.videoId).delete();
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
