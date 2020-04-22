import { Component } from "@angular/core";
import * as firebase from 'firebase';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "BrokenColor";
  constructor(public router: Router, private route: ActivatedRoute) {
    var me = this;
   firebase.auth().signInWithEmailAndPassword("tech@hopscotch.health","111111")
   /* this.route.queryParamMap.subscribe(params => {
      console.log(params.get("id"));
      firebase.auth().onAuthStateChanged((user) => {

        if (user) {
          if (user.isAnonymous) {
            //Anonymously user
            me.router.navigate(["/video-recorder/" + params.get("id")]);
          } else {
            if (window.location.href.indexOf("video-recorder") > -1) {
              me.router.navigate(["/video-recorder/" + params.get("id")]);
            } else {
              me.router.navigate(['home']);
            }
          }
        } else {
          me.router.navigate(["/video-recorder"]);

        }
      })
    });
*/

  }



}
