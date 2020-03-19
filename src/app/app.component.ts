import { Component } from "@angular/core";
import * as firebase from 'firebase';
import { Router } from '@angular/router';

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
        
        const userData = user.uid;
        console.log(user);
        if (user.emailVerified) {
          me.router.navigate(['home']);
        }  
        else{
          this.router.navigate(['/verify-email']);
        }
       // me.router.navigate(['home']);
      } else {
        me.router.navigate(["/login"]);
      }
    })
  }
}
