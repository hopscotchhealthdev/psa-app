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
  interval:any;
  constructor(private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
  //  this.fetchPsa();
  window.location.href = `${window.location.origin}/home/videochallenges.html`;
  }

  ngOnDestroy() { }

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