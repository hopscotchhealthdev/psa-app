import { Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from "@angular/core";
import * as firebase from 'firebase';


@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit  {
  testingSessions=[{video:"video-url", createDate: new Date().toDateString()},
  {video:"video-url 1", createDate: new Date().toDateString()},
  {video:"video-url 2", createDate: new Date().toDateString()},
  {video:"video-url 3", createDate: new Date().toDateString()},
  {video:"video-url 4", createDate: new Date().toDateString()},
  {video:"video-url 5", createDate: new Date().toDateString()}, 
  {video:"video-url 6", createDate: new Date().toDateString()},
  {video:"video-url 7", createDate: new Date().toDateString()},
  {video:"video-url 8", createDate: new Date().toDateString()},
  {video:"video-url 9", createDate: new Date().toDateString()},
  {video:"video-url 10", createDate: new Date().toDateString()},
  {video:"video-url 11", createDate: new Date().toDateString()},
  {video:"video-url 12", createDate: new Date().toDateString()},
  {video:"video-url 13", createDate: new Date().toDateString()},
  {video:"video-url 14", createDate: new Date().toDateString()},
  {video:"video-url 15", createDate: new Date().toDateString()} ]
  recordRTC: any;
  collection = [];
  p: number = 1;
  videos: any;
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
        .collection("users").doc(user.uid).collection("videos").onSnapshot(sessionSnap => {
          console.log(sessionSnap)
          sessionSnap.docChanges().forEach(change => {
            if (change.type === "added") {
              var data = change.doc.data();
              me.videos.push({
                date: new Date(data.createDate),
                url: data.url,
                videoId: change.doc.id
              })
            
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
