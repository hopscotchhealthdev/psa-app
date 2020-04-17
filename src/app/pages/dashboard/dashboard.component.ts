import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Component, ViewChild, TemplateRef, OnInit } from "@angular/core";
import * as firebase from 'firebase';
import * as moment from "moment";
import { ConfirmationDailogService } from '../confirmation-dailog/confirmation-dailog.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PreviewDailogComponent } from '../preview-dailog/preview-dailog.component';
import { PreviewDailogService } from '../preview-dailog/preview-dailog.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
  providers: [NgbActiveModal]
})
export class DashboardComponent implements OnInit {
  @ViewChild('videoPlay') videoPlay;
  p: number = 1;
  videos: any = [];
  public modalRef: any;
  loading: boolean = false;
  interval: any;
  subscribe: any;
  queryUnsubscribe: any;
  private ngUnsubscribe = new Subject<void>();
  constructor(private translate:TranslateService,private toastr: ToastrService, private router: Router, public activeModal: NgbActiveModal, private previewDailogService: PreviewDailogService, private confirmationDialogService: ConfirmationDailogService, public modalService: NgbModal, private route: ActivatedRoute, ) {

  }
  share(item) {
    window.location.href = `https://psanodeapp1.appspot.com/${firebase.auth().currentUser.uid}/videos/${item.id}`
    //  window.location.href = `${window.location.origin}/share/index.html#/${firebase.auth().currentUser.uid}/videos/${item.id}`
  }
  ngOnInit() {
    let queryUnsubscribe: any;
    let me = this;
    this.subscribe = this.route.queryParamMap.subscribe(params => {
      if (params.get("videoId")) {
        const videoId = params.get("videoId");
        firebase
          .firestore()
          .collection("users").doc(firebase.auth().currentUser.uid).collection("videos").doc(videoId).get().then(function (querySnapshot) {
            if (querySnapshot.exists) {
              const data = querySnapshot.data();
              const item = {
                url: data.outputUrl,
                id: querySnapshot.id,
                status: data.status,
                outputVideoId: data.outputVideoId,
                psaName: querySnapshot.data().name,
                psaId: querySnapshot.data().name,
                date: moment(new Date(data.createdDate.toDate())).format('LLLL')
              }
            me.open(item);

            }
          });
      }
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        me.loading = true;
        let count = 0;
        this.queryUnsubscribe = firebase
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
                me.videos.push({
                  date: moment(new Date(data.createdDate.toDate())).format('LLLL'),
                  url: data.outputUrl,
                  id: change.doc.id,
                  status: data.status,
                  outputVideoId: data.outputVideoId,
                  psaName: data.psaName,
                  psaId: data.psaId
                })
                if (count == sessionSnap.docs.length) {
                  me.videos.sort(function (x, y) {
                    return new Date(y.date).getTime() - new Date(x.date).getTime();
                  })
                }
                /* firebase.firestore().collection("psa").doc(data.psaId).get().then(function (querySnapshot) {
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
                   }
                 });*/
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
    me.interval = setInterval(() => {
      me.refreshList();
    }, 3000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.queryUnsubscribe) {
      this.queryUnsubscribe();
    }
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  }

  fetchUrl(item) {
    const me = this;
    item.loading = true;
    let bucketUrl="videos/output/" + item.outputVideoId;
    var uploadTask = firebase.storage().ref().child(bucketUrl);
    uploadTask.getDownloadURL().then(function (downloadLink) {
      item.loading = false;
      let downloadURL= `https://storage.googleapis.com/${firebase.storage().ref().bucket}/${bucketUrl}`
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
    this.fetchUrl(item);

  }


  open(item) {
    let buttonText = "";
    this.translate
    .get("home")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((translation: any) => {
      this.shwDeletePrompt(item, translation.del_prompt, "",  translation.yes,  translation.no);     
    
    if (!firebase.auth().currentUser.isAnonymous) {
      buttonText = translation.re_record;
    } else {
      buttonText =  translation.record_another;

    }
    this.previewDailogService.open(item.psaId,item.id, item.url, buttonText)
      .then((item:any) => {
        this.router.navigate(['/video-recorder'], { queryParams: { id: item.psaId,isUpdated:true,videoId:item.videoId },skipLocationChange:true });
      })
      .catch(() => { });

    });
  }

  hide(template: TemplateRef<any>) {
    this.modalService.dismissAll(template);

  }
  delete(item) {
    this.translate
    .get("home")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((translation: any) => {
      this.shwDeletePrompt(item, translation.del_prompt, "",  translation.yes,  translation.no);     
    });
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
