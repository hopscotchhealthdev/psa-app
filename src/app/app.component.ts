import { Component } from "@angular/core";
import * as firebase from 'firebase';
import { Router, NavigationExtras } from '@angular/router';

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
            if(localStorage.getItem("guid")){
              firebase.firestore().collection("anonymous").doc(localStorage.getItem("guid")).collection('videos').get()
              .then(res=>{
            console.log(res.docs)
            if(res.docs!=null){
              firebase.firestore().collection("users").doc(user.uid).collection('videos').add({
               res
              })
                .then(function () {
                //   firebase.firestore().collection("anonymous").doc(localStorage.getItem("guid")).delete().then(function() {
                //     console.log("Document successfully deleted!");
                // }).catch(function(error) {
                //     console.error("Error removing document: ", error);
                // });
                })
                .catch(function (error) {
                });
            }
              }).catch(err=>{
                console.log(err);
              })
            }
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
            console.log(window.location.href.indexOf("video-recording"))
             if (window.location.href.indexOf("video-recording") > -1)  {
              if((!localStorage.getItem("guid"))){
              localStorage.setItem('guid', this.Guid())
             }
             if(localStorage.getItem("guid")){
              let navigationExtras: NavigationExtras = {
                queryParams: {
                videoContentpage: true,
                  },skipLocationChange: true
                };
               setTimeout(() => {
                me.router.navigate(["/video-recorder"], navigationExtras);
                },1000);
             }
             
              }else{
                me.router.navigate(["/login"]);
              }
          }
        })
      
 
  }
  Guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() +
      s4() + s4() + s4() + s4();
  }
    
}
