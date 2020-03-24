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
      /* if (user) {
          var credential = firebase.auth.EmailAuthProvider.credential("test1@email.com", "123456");
          firebase.auth().currentUser.linkWithCredential(credential)
          .then(function(usercred) {
            var user = usercred.user;
            console.log("Account linking success", user);
          }).catch(function(error) {
            console.log("Account linking error", error);
          });
          
     } */
      if (user) {
        if (user.providerData.length == 0) {
          //Anonymously user
          me.router.navigate(["/video-recorder"]);
        } else {
          if (window.location.href.indexOf("video-recorder") > -1) {
            me.router.navigate(["/video-recorder"]);
          } else {
            me.router.navigate(['home']);
          }

        }
      } else {
        me.router.navigate(["/video-recorder"]);

      }
    })
  }



}
