import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
const email_pattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|in|net|org|pro|travel|health|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
@Component({
  selector: "app-profile",
  templateUrl: "profile.component.html"
})
export class ProfileComponent implements OnInit {
  public user = {
    userName: '',
    email: '',
    gender: '',
    age: 0,
    image: '',
    isProfile: false,
    validEmail: false
  }
  uploadProgress: any;
  public loading: boolean = false;
  public isAnonymous = false;
  constructor(private toastr: ToastrService,private router:Router) { }
  ngOnInit() {
    let me = this;
    firebase.auth().onAuthStateChanged((user) => {
      let me = this;
      if (user) {
        if (user.isAnonymous) {
          me.isAnonymous = true;
        } else {
          me.loadUser();
        }

      } else {
        me.isAnonymous = true;
      }
    })

  }
  validateAge(evt) {
    if (parseInt(evt.target.value) < 0) {
      this.user.age = 0;
    }
  }
  validateEmail(evt) {
    if (email_pattern.test(evt.target.value)) {
      this.user.validEmail = true;
    } else {
      this.user.validEmail = false;

    }
  }

  loadUser() {
    let me = this;
    if (firebase.auth().currentUser && !firebase.auth().currentUser.isAnonymous) {
      me.loading = true;
      me.isAnonymous = false;
      firebase
        .firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((userRef) => {
          me.loading = false;
          const data = userRef.data();
          me.user.userName = data.userName ? data.userName : '';
          me.user.age = data.age ? data.age : null;
          me.user.gender = data.gender ? data.gender : "male";
          me.user.email = data.email;
          me.user.image = data.image ? data.image : "assets/img/anime3.png"
          if (me.user.image != "assets/img/anime3.png") {
            me.user.isProfile = true;
          }
          if (me.user.email && email_pattern.test(me.user.email)) {
            this.user.validEmail = true;
          }
        }).catch(err => {
          me.loading = false;
        })
    } else {
      this.isAnonymous = true;
    }
  }

  update() {
    let me = this;
    me.loading = true;
    firebase
      .firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
        userName: me.user.userName ? me.user.userName : '',
        age: me.user.age ? me.user.age : '',
        gender: me.user.gender ? me.user.gender : '',
        email: me.user.email ? me.user.email : '',

      }).then(res => {
        me.loading = false;
        me.toastr.success('Profile  updated successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
    me.router.navigate(['/home']);
      }).catch(err => {
        me.loading = false;
        me.toastr.error('Profile error', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      })
  }

  renoveImage() {
    let me = this;
    me.loading = true;
    firebase
      .firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
        image: null
      }).then(res => {
        me.user.image = "assets/img/anime3.png";
        me.user.isProfile = false;
        me.loading = false;
      });

  }

  fileInput(obj) {
    var me = this;
    if (obj.target.files.length > 0) {
      // me.loading = true;
      var fr = new FileReader();
      fr.onload = function (res: any) {
        me.user.image = res.target.result;
      }
      fr.readAsDataURL(obj.target.files[0]);
      var uploadTask = firebase.storage().ref().child('images').child(obj.target.files[0].name).put(obj.target.files[0]);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
        me.uploadProgress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes * 100).toString());
      }, function (error) {
        me.loading = false
      }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        setTimeout(function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            me.user.image = downloadURL;
            firebase
              .firestore().collection("users").doc(firebase.auth().currentUser.uid)
              .update({
                image: downloadURL
              })
              .then(res => {
                me.loading = false;
                me.user.isProfile = true;
                firebase
                  .auth()
                  .currentUser.updateProfile({
                    photoURL: downloadURL
                  })
                  .then(res => { })
                  .catch(err => {
                    me.loading = false;

                  });
              })
              .catch(err => {
                me.loading = false;
              });
          });
        }, 1000);

      });
    }
  }
  addPhoto() {
    document.getElementById("file").click();
  }
}
