import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import * as firebase from "firebase";
const email_pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|in|net|org|pro|travel|health|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error: string = "";
  public loading: boolean = false;
  constructor(private router: Router, fb: FormBuilder, private route: ActivatedRoute) {
    this.router = router;

  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {

    })

  }


  doFbLogin() {
    const me = this;
    FB.login(function (response) {
      if (response.authResponse) {
        console.log("Welcome!  Fetching your information.... ");
        FB.api("/me?fields=email,first_name,last_name", function (user) {
          console.log("users" + JSON.stringify(user));
          me.loginFacebook(response, user);
        });
      } else {
        console.log("User cancelled login or did not fully authorize.");
      }
    });
  }

  loginFacebook(response, user) {
    const me = this;
    me.loading = true;
    const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
      response.authResponse.accessToken
    );
    if (firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous) {
      firebase.auth().currentUser.linkWithPopup(facebookCredential).then(
        (fbUser: any) => {
          me.createUserProfile(fbUser.user, user.first_name + user.last_name, user.email, true);
        },
        error => {
          me.loading = false;
          me.error = error.message;
        }
      );
    } else {
      firebase.auth().signInWithCredential(facebookCredential).then(
        (fbUser: any) => {
          me.createUserProfile(fbUser.user, user.first_name + user.last_name, user.email, false);
        },
        error => {
          me.loading = false;
          me.error = error.message;
        }
      );
    }
  }

  createUserProfile(user, name, email, isAnonymous) {
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
        updateProfile();
      } else {
        createProfile();
      }
    });

    function updateProfile() {
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
    function createProfile() {
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

  doGoogleLogin() {
    const me = this;
    console.log(firebase.auth().currentUser);
    const provider = new firebase.auth.GoogleAuthProvider();
    if (firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous) {
      firebase.auth().currentUser.linkWithPopup(provider).then(
        (googleUser: any) => {
          me.loading = true;
          me.createUserProfile(googleUser.user,
            googleUser.user.displayName, googleUser.user.email, true);
        },
        error => {
          me.error = error.message;
        }
      );
    } else {
      firebase.auth().signInWithPopup(provider).then(
        (googleUser: any) => {
          me.loading = true;
          me.createUserProfile(googleUser.user,
            googleUser.user.displayName, googleUser.user.email, false);
        },
        error => {
          me.error = error.message;
        }
      );
    }
  }

  doAppleLogin() {
    const me = this;
    const provider = new firebase.auth.OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');
    if (firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous) {

      firebase.auth().currentUser.linkWithPopup(provider).then(
        (appleUser: any) => {
          me.loading = true;
          me.createUserProfile(appleUser.user, appleUser.user.displayName, appleUser.user.email, true);
        },
        error => {
          me.error = error.message;
        }
      );
    } else {
      firebase.auth().signInWithPopup(provider).then(
        (appleUser: any) => {
          me.loading = true;
          me.createUserProfile(appleUser.user, appleUser.user.displayName, appleUser.user.email, false);
        },
        error => {
          me.error = error.message;
        }
      );
    }
  }

  doGithubLogin() {
    const me = this;
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    if (firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous) {
      firebase.auth().currentUser.linkWithPopup(provider).then(
        (gitUser: any) => {
          me.loading = true;
          me.createUserProfile(gitUser.user, " ", gitUser.user.email, true);
        },
        error => {
          me.error = error.message;
        }
      );
    } else {
      firebase.auth().signInWithPopup(provider).then(
        (gitUser: any) => {
          me.loading = true;
          me.createUserProfile(gitUser.user, " ", gitUser.user.email, false);
        },
        error => {
          me.error = error.message;
        }
      );
    }

  }

  doTwitterLogin() {
    const me = this;
    const provider = new firebase.auth.TwitterAuthProvider();
    if (firebase.auth().currentUser && firebase.auth().currentUser.isAnonymous) {
      firebase.auth().currentUser.linkWithPopup(provider).then(
        (twitterUser: any) => {
          me.loading = true;
          me.createUserProfile(twitterUser.user, twitterUser.user.displayName, twitterUser.user.email, true);
        },
        error => {
          me.error = error.message;
        }
      );
    } else {
      firebase.auth().signInWithPopup(provider).then(
        (twitterUser: any) => {
          me.loading = true;
          me.createUserProfile(twitterUser.user, " ", twitterUser.user.email, false);
        },
        error => {
          me.error = error.message;
        }
      );
    }
  }

  redirctToRecorderApp() {
    window.location.href = `${window.location.origin}/recorder/index.html`;
  }

}
