import { Component } from "@angular/core";
import * as firebase from 'firebase';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "BrokenColor";
  
  constructor(public router: Router) {
    var me = this;
  firebase.auth().onAuthStateChanged((user) => {
  
    })
  }



}
