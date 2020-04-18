import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as firebase from "firebase";
import { TranslateService } from "@ngx-translate/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
const email_pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|in|net|org|pro|travel|health|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
declare var FB: any;
@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.scss']
})
export class LoginEmailComponent implements OnInit {
  public form: FormGroup;
  public error: string = "";
  public loading: boolean = false;
  private ngUnsubscribe = new Subject<void>();
  constructor(private router: Router, fb: FormBuilder, public translate: TranslateService) {
    this.router = router;
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.pattern(email_pattern)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() { 
   
  }

  public onSubmit(values: any): void {
    var me = this;
    if (this.form.valid) {
      me.loading = true;
      firebase.auth().signInWithEmailAndPassword(values.email, values.password)
        .then(function onSuccess(res) {
          me.loading = false;
          if (res.user.emailVerified) {
            // redirect back to main app again
            window.location.href = `${window.location.origin}/recorder/index.html`;

          }
          else {
            me.router.navigate(["/verify-email"]);
          }
        })
        .catch(function onFailure(err) {
          me.loading = false;
          me.translate
            .get("email_auth")
            .pipe(takeUntil(me.ngUnsubscribe))
            .subscribe((translation: any) => {
              if (err.code == "auth/user-not-found") {
                me.error = translation.user_not_found
              }
              else if (err.code == "auth/wrong-password") {
                me.error = translation.invalid
              }
              else {
                me.error = err.message;
              }
            });
        });
    }
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
