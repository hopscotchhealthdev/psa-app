import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { CustomValidators } from 'ng2-validation';
import * as firebase from "firebase";
const email_pattern =  /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|in|net|org|pro|travel|health|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public userMessage = {
    success: false,
    message: ""
  };
  constructor(router: Router, fb: FormBuilder) {
    this.router = router;
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required,Validators.pattern(email_pattern)])],
    });

  }
  ngOnInit() {
  }
  onSubmit(values) {
    let me = this;
    me.userMessage.message = "";
    firebase.auth().sendPasswordResetEmail(values.email)
      .then(() => {
        me.userMessage.success = true;
        me.userMessage.message = "Reset link sent successfully to your registered email";
      })
      .catch((error: any) => {
        me.userMessage.success = false;
        switch (error.code) {
          case "auth/invalid-email":
            me.userMessage.message = "Invalid Email";
            break;
          case "auth/user-not-found":
            me.userMessage.message = "User does not exist";
            break;
          default:
            me.userMessage.message = error.messages;
            break;
        }
      });
  }
}
