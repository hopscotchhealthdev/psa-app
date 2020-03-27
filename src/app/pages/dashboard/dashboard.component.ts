import { Router, NavigationExtras } from '@angular/router';
import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import * as firebase from 'firebase';
import * as moment from "moment";
import { ConfirmationDailogService } from '../confirmation-dailog/confirmation-dailog.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  providers: [NgbActiveModal]
})
export class DashboardComponent implements OnInit {
  @ViewChild('videoPlay') videoPlay;
  recordRTC: any;
  collection = [];
  p: number = 1;
  videos: any = [];
  modalRef: any;
  loading: boolean = false;
  constructor(private router: Router, public activeModal: NgbActiveModal, private confirmationDialogService: ConfirmationDailogService, public modalService: NgbModal) {

  }
  share(url) {
    console.log(url)
  }
  ngOnInit() {
    let queryUnsubscribe: any;
    let me = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        me.loading = true;
        let count = 0;
        firebase
          .firestore()
          .collection("users").doc(user.uid).collection("videos").where("userId", "==", user.uid).onSnapshot(sessionSnap => {
            sessionSnap.docChanges().forEach(change => {
              if (change.type === "added") {
                count++;
                if (count == change.doc.data.length) {
                  me.loading = false;
                }
                var data = change.doc.data();
                firebase.firestore().collection("psa").doc(data.psaId).get().then(function (querySnapshot) {
                  if (querySnapshot.exists) {
                    me.videos.push({
                      date: moment(new Date(data.createdDate)).format('LLLL'),
                      url: data.url,
                      id: change.doc.id,
                      psaName: querySnapshot.data().name,
                      psaTime: querySnapshot.data().time
                    })
                  }

                });
              }
              if (change.type === "modified") {

              }
              if (change.type === "removed") {
                let index = this.videos.findIndex(o => o.id == change.doc.id);
                if (index > -1) {
                  this.videos.splice(index, 1);
                }
              }
            })
          });
      }
    })
  }

  play(item, template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template);
    let me = this;
    setTimeout(() => {
      let el: any = document.getElementById("videoPlay");
      el.src = item.url;
      el.play();

    }, 400);

  }

  hide(template: TemplateRef<any>) {
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
            .collection("users").doc(firebase.auth().currentUser.uid).collection("videos").doc(item.id).delete();
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
