import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import * as firebase from 'firebase';


@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit  {

  recordRTC: any;
  collection = [];
  p: number = 1;
  videos: any=[];
  constructor(private router: Router) {  
    
}
download(url){
    this.recordRTC.save(url);
}
delete(index){
console.log(index)
}
Share(url){
  console.log(url)
}
ngOnInit(){
  let queryUnsubscribe: any;
    let me = this;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
        .firestore()
        .collection("users").doc(user.uid).collection("videos").where("userId","==",user.uid).onSnapshot(sessionSnap => {
          console.log(sessionSnap)
          sessionSnap.docChanges().forEach(change => {
           
            if (change.type === "added") {
              var data = change.doc.data();
            /*  me.videos.push({
                date: new Date(data.createDate),
                url: data.url,
                videoId: change.doc.id
              })*/
            
            }
            if (change.type === "modified") {
            
            }
            if (change.type === "removed") {
              let index = this.videos.findIndex(o => o.videoId == change.doc.id);
              if (index > -1) {
                this.videos.splice(index, 1);
              }
            }
               })
        });
      }})
}
}
