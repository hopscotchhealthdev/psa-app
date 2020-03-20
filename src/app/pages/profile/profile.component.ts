import { Component, OnInit } from "@angular/core";
import * as firebase from "firebase";
import { ToastrService } from 'ngx-toastr';
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
    image: ''
  }
  public loading: boolean = false;
  constructor(private toastr: ToastrService) { }
  ngOnInit() {

  }
  ngAfterViewInit() {
    let me = this;

    if (firebase.auth().currentUser) {
      me.loading = true;
      firebase
        .firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((userRef) => {
          me.loading = false;
          const data = userRef.data();
          me.user.userName = data.userName ? data.userName : '';
          me.user.age = data.age ? data.age : null;
          me.user.gender = data.gender?data.gender:"male";
          me.user.email = data.email;
          me.user.image = data.image ? data.image : "assets/img/placeholder.jpg"
        }).catch(err => {
          me.loading = false;
        })
    }
  }
  update() {
    let me = this;
    me.loading = true;
    firebase
      .firestore().collection("users").doc(firebase.auth().currentUser.uid).update({
        userName: me.user.userName,
        age: me.user.age,
        gender: me.user.gender
      }).then(res => {
        me.loading = false;
        me.toastr.success('Profile  updated successfully', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      }).catch(err => {
        me.loading = false;
        me.toastr.error('Profile error', '', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      })
  }

  fileInput(obj) {
    var me = this;
    if (obj.target.files.length > 0) {
      me.loading = true;
      var storageRef = firebase.storage().ref("/images/" + obj.target.files[0].name);
      var uploadTask = storageRef
        .put(obj.target.files[0])
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(function (downloadURL) {
            me.user.image = downloadURL;
            firebase
              .firestore().collection("users").doc(firebase.auth().currentUser.uid)
              .update({
                image: downloadURL
              })
              .then(res => {
                me.loading = false;
                me.toastr.success('Profile image updated successfully', '', {
                  timeOut: 2000,
                  positionClass: 'toast-top-center',
                });
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

        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  addPhoto() {
    document.getElementById("file").click();
  }
}
