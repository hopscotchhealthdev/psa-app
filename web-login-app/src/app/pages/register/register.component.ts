import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as firebase from "firebase";
const email_pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|in|net|org|pro|travel|health|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public error: string = "";
  public loading: boolean = false;
  constructor(router: Router, public fb: FormBuilder, ) {
    this.router = router;

    this.form = fb.group({
      'userName': ['', Validators.compose([Validators.required])],
      'email': ['', Validators.compose([Validators.required, Validators.pattern(email_pattern)])],
      "password": ['', [Validators.required, Validators.minLength(6)]],
      "confirmPassword": ['', Validators.compose([Validators.required, this.matchingPasswords('password')])],
      'termCondition': [false, Validators.compose([Validators.requiredTrue])]
    });

  }

  ngOnInit() {
  }
  public matchingPasswords(field_name) {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }

  public onSubmit(values: any) {
    let me = this;
    me.error = "";
    me.loading = true;
    if (firebase.auth().currentUser) {
      var credential = firebase.auth.EmailAuthProvider.credential(values.email,
        values.password);
      firebase.auth().currentUser.linkWithCredential(credential)
        .then(function (usercred) {
          firebase.auth().currentUser.reload();
          var user = usercred.user;
          me.loading = false;
          firebase
            .firestore().collection("users").doc(user.uid).set({
              userName: values.userName,
              email: values.email,
              createdDate: new Date(),
              userId: user.uid
            }).then(() => {
              return firebase
                .auth().currentUser.sendEmailVerification()
                .then(() =>{
                  me.router.navigate(["/verify-email"]);
                })
            }).catch(function (error) {
              me.error = error.message;
            });
          console.log("Account linking success", user);
        }).catch(function (error) {
          me.loading = false;
          me.error = error.message;
        });

    } else {
      firebase.auth().createUserWithEmailAndPassword(values.email,
        values.password).then(function (data) {
          me.loading = false;
          firebase
            .firestore().collection("users").doc(data.user.uid).set({
              userName: values.userName,
              email: values.email,
              createdDate: new Date(),
              userId: data.user.uid
            }).then(() => {
              return firebase
                .auth().currentUser.sendEmailVerification()
                .then(() => console.log("verification sent"))
            }).catch(function (error) {
              me.error = error.message;
            });
        }).catch(function (error) {
          me.loading = false;
          me.error = error.message;
        });
    }
  }
}
