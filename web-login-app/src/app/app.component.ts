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

        if (user.providerData.length == 0) {
          me.router.navigate(["/login"]);
        } else {
          if (user.emailVerified) {
            /// redirect back to main app again
            window.location.href = `${window.location.origin}/recorder/index.html`;

          }
          else {
            me.router.navigate(["/verify-email"]);
          }
        }
      } else {
        me.router.navigate(["/login"]);
      }
    })
  }



}
