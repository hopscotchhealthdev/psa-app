import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as firebase from "firebase";
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-psa-list',
  templateUrl: './psa-list.component.html',
  styleUrls: ['./psa-list.component.scss']
})
export class PsaListComponent implements OnInit {
  public loading = false;
  psa = [];
  groups=[];
  psaSelect: string = '';
  instruction = false;
  src: string = "";
  subscribe: any;
  interval:any;
  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.subscribe = this.route.queryParamMap.subscribe(params => {
      if (params.get("instruction")) {
        /*  if (params.get('type') == 'PermissionDeniedError') {
  
          }
          */
        var userAgent = window.navigator.userAgent;
        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
          // iPad or iPhone 
          this.src = "https://firebasestorage.googleapis.com/v0/b/recordingmechanic.appspot.com/o/instruction%2Fios_Device.MP4?alt=media&token=e4e228ab-f4ff-4903-8e56-c82463ee3107";
        }
        else {
          this.src = "https://firebasestorage.googleapis.com/v0/b/recordingmechanic.appspot.com/o/instruction%2FFile%20from%20iOS%20(3).mp4?alt=media&token=e3d47df5-b926-4f8c-a601-3a5c0aac8b93"
        }
        this.instruction = true;

      }
    })
    let oldValue = localStorage.getItem("language");
  this.interval=  setInterval(() => {
      let newValue = localStorage.getItem("language");
      if (oldValue != newValue) {
        this.fetchPsa();
      }
      oldValue = newValue
    }, 1000);
    this.fetchPsa();
  }

  ngOnDestroy() {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if(this.interval){
      clearInterval(this.interval);
    }
  }
  ngAfterViewInit() { }

  choose(value) {
    this.router.navigate(['/video-recorder'], { queryParams: { id: value } });

  }

  fetchPsa() {
    const me = this;
    me.psa = [];
    me.loading = true;
    let lang = localStorage.getItem("language");
    let count=0;
    firebase.firestore().collection("psa").get().then(function (querySnapshot) {
      me.loading = false;
      querySnapshot.forEach(snapItem => {
        count++;
        me.psa.push({
          id: snapItem.id,
          data: snapItem.data()
        })
        if(count == querySnapshot.docs.length ){
            me.groupData();
        }
      });
    });
  }

  groupData(){
   this.groups = this.psa.reduce((r, a) => {
      r[a.data.lang] = [...r[a.data.lang] || [], a];
      return r;
     }, {});
  
  }

}