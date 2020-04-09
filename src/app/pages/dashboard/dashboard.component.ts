import { Router, NavigationExtras } from '@angular/router';
import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import * as firebase from 'firebase';
import * as moment from "moment";
import { ConfirmationDailogService } from '../confirmation-dailog/confirmation-dailog.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  public modalRef: any;
  loading: boolean = false;
  interval: any;
  constructor(private toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal, private confirmationDialogService: ConfirmationDailogService, public modalService: NgbModal) {

  }
  share(item) {
    window.location.href = `${window.location.origin}/share/index.html#/${firebase.auth().currentUser.uid}/videos/${item.id}`
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
          .collection("users").doc(user.uid).collection("videos").orderBy("createdDate").where("userId", "==", user.uid).onSnapshot(sessionSnap => {
            if (sessionSnap.docs.length == 0) {
              me.loading = false;
            }
            sessionSnap.docChanges().forEach(change => {
              if (change.type === "added") {
                count++;
                if (count == sessionSnap.docs.length) {
                  me.loading = false;
                }
                var data = change.doc.data();
                firebase.firestore().collection("psa").doc(data.psaId).get().then(function (querySnapshot) {
                  if (querySnapshot.exists) {
                    me.videos.push({
                      date: moment(new Date(data.createdDate.toDate())).format('LLLL'),
                      url: data.outputUrl,
                      id: change.doc.id,
                      status: data.status,
                      outputVideoId: data.outputVideoId,
                      psaName: querySnapshot.data().name,
                      psaTime: querySnapshot.data().time
                    })

                    if (count == sessionSnap.docs.length) {
                      me.refreshList();
                      me.videos.sort(function (x, y) {
                        return new Date(y.date).getTime() - new Date(x.date).getTime();
                      })
                    }
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

  ngOnDestroy() {
    if (this.interval) {
      setInterval(this.interval);
    }
  }
  getStatus(status) {
    if (status == 1) {
      return "success";
    }
    if (status == 2) {
      return "Retry Again";

    }
    if (status == 3) {
      return "Failed";

    }
  }

  refreshList() {
    let me = this
    me.videos.forEach(element => {
      if (element.status == 2) {
        me.fetchUrl(element);
      }
    });
    me.interval = setInterval(() => {
      me.refreshList();
    }, 4000);
  }

  fetchUrl(item) {
    const me = this;
    item.loading = true;
    var uploadTask = firebase.storage().ref().child("videos/output/" + item.outputVideoId);
    uploadTask.getDownloadURL().then(function (downloadURL) {
      item.loading = false;
      firebase
        .firestore()
        .collection("users").doc(firebase.auth().currentUser.uid).collection("videos").doc(item.id).update({ "status": 1, outputUrl: downloadURL }).then(function (res) {
          item.status = 1;
          item.outputUrl = downloadURL;
        })
      item.url = downloadURL;
    }).catch(function (error) { })
  }

  retry(item, count) {
    const me = this;
    item.loading = true;
    var uploadTask = firebase.storage().ref().child("videos/output/" + item.outputVideoId);
    uploadTask.getDownloadURL().then(function (downloadURL) {
      item.loading = false;
      firebase
        .firestore()
        .collection("users").doc(firebase.auth().currentUser.uid).collection("videos").doc(item.id).update({ "status": 1, outputUrl: downloadURL }).then(function (res) {
          item.status = 1;
          item.outputUrl = downloadURL;
        })

      item.url = downloadURL;
    }).catch(function (error) {
      // setTimeout(() => {

      //     me.retry(item, count + 1);

      // }, 4000);
    })


  }

  play(item, template: TemplateRef<any>) {
    this.modalRef = this.modalService.open(template, {
      backdrop: 'static',
      keyboard: false
    });
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
    this.shwDeletePrompt(item, "Are you sure you want to delete this video?", "", "Yes", "No");
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
