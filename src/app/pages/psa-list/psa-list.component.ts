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
  psaSelect: string = '';
  constructor( private router: Router) {

  }
  ngOnInit() {
    this.fetchPsa();
  }
  ngAfterViewInit() { }

  choose(value){
    this.router.navigate(['/video-recorder'], { queryParams: { id: value } });
     
  }

  fetchPsa() {
    const me = this;
    me.psa = [];
    me.loading = true;
    firebase.firestore().collection("psa").get().then(function (querySnapshot) {
      me.loading = false;
      querySnapshot.forEach(snapItem => {
        me.psa.push({
          id: snapItem.id,
          data: snapItem.data()
        })
        console.log(me.psa)
      });
    });
  }



}