import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as firebase from "firebase";
const email_pattern =  /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|in|net|org|pro|travel|health|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public error: string = "";
  public loading: boolean = false;
  constructor(private router: Router, fb: FormBuilder) {
    this.router = router;
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required,Validators.pattern(email_pattern)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() { }
  public onSubmit(values: any): void {
    var me = this;
    if (this.form.valid) {
      me.loading = true;
      firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        .then(function onSuccess(res) {
          me.loading = false;
          me.router.navigate(['home']);
        })
        .catch(function onFailure(err) {
          me.loading = false;
          if (err.code == "auth/user-not-found") {
            me.error = "user not found"
          }
          else if (err.code == "auth/wrong-password") {
            me.error = "wrong password";
          }
          else {
            me.error = err.message;
          }
        });

    }

  }

}
