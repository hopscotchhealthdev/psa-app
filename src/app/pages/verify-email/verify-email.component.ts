import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { Router } from '@angular/router';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  interval: any;
  constructor(private router: Router) { }

  
 
  ngOnInit() {
    let user = firebase.auth().currentUser;
    if (user) {
      let interval = setInterval(() => {
        user.reload();
        if (user.emailVerified) {          
            this.router.navigateByUrl('/home');          
          clearInterval(interval);
        }
      }, 2000);
    }

  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  logout() {
    firebase.auth().signOut();    
  }
}
