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
      if (user) {
        if (user.isAnonymous) {
          me.router.navigate(["/login"]);
        } else {
          if (user.providerData[0].providerId == "password" && !user.emailVerified) {
            me.router.navigate(["/verify-email"]);         
          }
          else {
            window.location.href = `${window.location.origin}/recorder/index.html`;
            
          }
        }
      } else {
        me.router.navigate(["/login"]);
      }
    })
  }



}
