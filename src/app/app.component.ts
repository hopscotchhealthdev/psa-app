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
        if (localStorage.getItem("guid")) {
          firebase.firestore().collection("anonymous").where("userId", "==", localStorage.getItem("guid")).get()
            .then(queryAnonymous => {
              let count = 0;
              queryAnonymous.docs.forEach(anonymous => {
                count++;
                const data = anonymous.data();
                firebase.firestore().collection("users").doc(user.uid).collection("videos").add({
                  userId: user.uid,
                  url: data.url,
                  createdDate: data.createdDate
                })
                firebase.firestore().collection("anonymous").doc(anonymous.id).delete();
                if (count == queryAnonymous.docs.length) {
                  localStorage.removeItem("guid");
                }
              });

            }).catch(err => {
              console.log(err);
            })
        }
        if (user.emailVerified) {
          if (window.location.href.indexOf("video-recorder") > -1) {
            me.router.navigate(["/video-recorder"]);
          } else {
            me.router.navigate(['home']);

          }
        }
        else {
          this.router.navigate(['/verify-email']);
        }
        // me.router.navigate(['home']);
      } else {
        if (window.location.href.indexOf("video-recorder") > -1) {
          if ((!localStorage.getItem("guid"))) {
            localStorage.setItem('guid', this.Guid())
          }
          let navigationExtras: NavigationExtras = {
            queryParams: {
              videoContentpage: true,
            }, skipLocationChange: true
          };
          setTimeout(() => {
            me.router.navigate(["/video-recorder"], navigationExtras);
          }, 1000);

        } else {
          me.router.navigate(["/login"]);
        }
      }
    })
  }

  Guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() +
      s4() + s4() + s4() + s4();
  }

}
