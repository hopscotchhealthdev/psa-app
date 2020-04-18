import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as firebase from "firebase";
import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
@Component({
  selector: 'app-auth-phone',
  templateUrl: './auth-phone.component.html',
  styleUrls: ['./auth-phone.component.scss']
})
export class AuthPhoneComponent implements OnInit {
  @ViewChild("swapOtp") private cntSwal: SwalComponent;
  public error: string = "";
  public loading: boolean = false;
  phone: string = "";
  code: string = "91";
  public swalType = "info";
  confirmationResult: any;
  isAnonymous: boolean = false;
  private ngUnsubscribe = new Subject<void>();
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  constructor(private router: Router, fb: FormBuilder,private translate:TranslateService) {
    this.router = router;
    let me = this;
    me.loading = false;
  }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }
  onCountryChange(event) {
    this.code = event.dialCode;
  }
  getNumber(event) {

    console.log(event);
  }

  signIn() {
    const appVerifier = this.recaptchaVerifier;
    let phoneNum = "+" + this.code + this.phone;
    const me = this;
    if (firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous) {
      firebase.auth().currentUser.linkWithPhoneNumber(phoneNum, appVerifier)
        .then((confirmationResult) => {
          // At this point SMS is sent. Ask user for code.
          me.confirmationResult = confirmationResult;
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).

          me.translate
          .get("phone_auth")
          .pipe(takeUntil(me.ngUnsubscribe))
          .subscribe((translation: any) => {
            me.cntSwal.title = translation.otp_title;
            me.cntSwal.text = translation.otp_time;                   
            me.cntSwal.confirmButtonText = translation.verify;
            me.cntSwal.cancelButtonText = translation.cancel;
            me.cntSwal.showConfirmButton = true;
            me.cntSwal.showCancelButton = true;
            me.isAnonymous = true;
            me.cntSwal.show();
            me.loading = false
          });

        
        })
        .catch((error) => {
          me.loading = false;
          console.error("SMS not sent", error);
          me.error = error;
        });
    } else {
      firebase.auth().signInWithPhoneNumber(phoneNum, appVerifier)
        .then(confirmationResult => {
          me.confirmationResult = confirmationResult;
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          me.translate
          .get("phone_auth")
          .pipe(takeUntil(me.ngUnsubscribe))
          .subscribe((translation: any) => {
            me.cntSwal.title = translation.otp_title;
            me.cntSwal.text = translation.otp_time;                   
            me.cntSwal.confirmButtonText = translation.verify;
            me.cntSwal.cancelButtonText = translation.cancel;
            me.cntSwal.showConfirmButton = true;
            me.cntSwal.showCancelButton = true;
            me.cntSwal.show();
            me.isAnonymous = false;
            me.loading = false;
          });

         

        })
        .catch(function (error) {
          me.loading = false;
          console.error("SMS not sent", error);
          me.error = error;
        });
    }


  }
  getOtp(otp) {
    const me = this;
    me.loading = true;
    this.confirmationResult
      .confirm(otp)
      .then(function (result) {
        // User signed in successfully.
        me.createUserProfile(result.user, " ", " ");
        // ...
      })
      .catch(function (error) {
        me.loading = false;
        me.error=error
        // User couldn't sign in (bad verification code?)
        // ...
      })
  }


  createUserProfile(user, name, email) {
    let me = this;
    const userData = {
      userName: name,
      email: email,
      image: user.photoURL
    };
    firebase.firestore().collection("users").doc(user.uid).get().then(function (querySnapshot) {
      if (querySnapshot.exists) {
        const data = querySnapshot.data();
        if (data.email && data.email != "") {
          userData.email = data.email;
        }
        if (data.userName && data.userName != "") {
          userData.userName = data.userName;
        }
        if (data.image && data.image != "") {
          userData.image = data.image;
        }
        updateProfile(userData);
      } else {
        createProfile(userData);
      }
    });

    function updateProfile(userData) {
      firebase
        .firestore().collection("users").doc(user.uid).update({
          userName: userData.userName,
          email: userData.email,
          userId: user.uid,
          image: userData.image
        }).then(() => {
          me.loading = false;
          me.redirctToRecorderApp();

        }).catch(function (error) {
          me.loading = false;
          me.error = error.message;
        });
    }
    function createProfile(userData) {
      firebase
        .firestore().collection("users").doc(user.uid).set({
          userName: userData.userName,
          email: userData.email,
          createdDate: new Date(),
          userId: user.uid,
          image: userData.image
        }).then(() => {
          me.loading = false;
          me.redirctToRecorderApp();

        }).catch(function (error) {
          me.loading = false;
          me.error = error.message;
        });
    }
  }


  redirctToRecorderApp() {
    window.location.href = `${window.location.origin}/recorder/index.html`;
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
