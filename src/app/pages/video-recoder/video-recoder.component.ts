import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as RecordRTC from "recordrtc/recordrtc.min.js";
import * as firebase from "firebase";
import { Observable } from 'rxjs';
import { ConfirmationDailogService } from '../confirmation-dailog/confirmation-dailog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { min } from 'moment';


@Component({
  selector: 'app-video-recoder',
  templateUrl: './video-recoder.component.html',
  styleUrls: ['./video-recoder.component.scss']
})
export class VideoRecoderComponent implements OnInit {
  private stream: MediaStream;
  private recordRTC: any;
  uploadProgress;
  recording: boolean = false;
  progress = false;
  isPlaying = false;
  counter: any;
  timecount;
  upload = false;
  @ViewChild('video') video;
  @ViewChild('videoPlay') videoPlay;
  img: any;
  videoData: any;
  markText: string = "";
  constructor(private confirmationDialogService: ConfirmationDailogService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params) {
      
      }


    });
  }
  ngOnInit() {

  }
  ngAfterViewInit() {
  }

  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'video/webm',
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = this.stream;
    video.muted = true;
    video.controls = false;
    video.autoplay = true;
    this.recording = true;
    this.isPlaying = false;
    this.startTimer();
    // this.markText= "With the recent COVID 19 pandemic across the world,it is important for us to stay safe, stay clean and isolate ourselves from large groups.Ideally you should be working from home, However, if you can’t, here are some things you do in your office. First, make sure that all surfaces are clean, before being touched by anyone. Second, everyone in the office must wash their hands frequently. Make alcohol-based sanitizers available at every entrance door. If the office has visitors, these visitors could be carrying germs for unknown places.";
    this.markText = "With the recent COVID 19 pandemic across the world,";
    let me = this

  
  }

  errorCallback() {
    //handle error here
    console.log("error");
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.videoPlay.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    var recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) {
      console.log(dataURL)
    });
  }

  startRecording() {
    this.upload = false;
    let mediaConstraints: any = {
      video: {
      }, audio: true
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
    this.recording = false;
    this.isPlaying = true;
    this.upload = true
    this.pauseTimer();
  }

  download() {
    this.recordRTC.save('video.webm');
  }
  pauseTimer() {
    clearInterval(this.counter);
    this.timecount = 0;
  }
  startTimer() {
    this.timecount = 0;
    var count = '1'; // it's 00:01:02
    this.counter = setInterval(timer, 1000);
    var me = this;
    function timer() {
      if (parseInt(count) <= 0) {
        clearInterval(me.counter);
        return;
      }
      me.timecount = me.getHHMMSS(count);

      count = (parseInt(count) + 1).toString();
    }
  }

  getHHMMSS(count) {
    var sec_num = parseInt(count, 10); // don't forget the second parm
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours = 0 + hours;
    }
    if (minutes < 10) {
      minutes = 0 + minutes;
    }
    if (seconds < 10) {
      seconds = 0 + seconds;
    }
    var time = this.pad(hours) + ':' + this.pad(minutes) + ':' + this.pad(seconds);

if(hours==0 && minutes==0){
  if(seconds==5){
    this.markText = "it is important for us to stay safe, stay clean and"; 
  }
  if(seconds==9){
    this.markText = "isolate ourselves from large groups"; 
  }
  if(seconds==12){
    this.markText = "Ideally you should be working from home"; 
  }
  if(seconds==14){
    this.markText = "However, if you can’t, here are some things you do in your office."; 
  }
  if(seconds==18){
    this.markText = "First, make sure that all surfaces are clean, before being touched by anyone."; 
  }
  if(seconds==20){
    this.markText = "Second, everyone in the office must"; 
  }
  if(seconds==21){
    this.markText = "wash their hands frequently."; 
  }
  if(seconds==22){
    this.markText = " Make alcohol-based sanitizers available at every entrance door."; 
  }
  if(seconds==23){
    this.markText = "If the office has visitors, these visitors could be carrying germs for unknown places"; 
  }
  if(seconds > 25){
   this.markText=""; 
  }
}

    return time;
  }
   pad(n) {
    return (n < 10) ? ("0" + n) : n;
}
  public uploadvideo() {
    var title = 'please confirm...';
    var message = 'Are you sure you want to upload this video?';
    var btnOkText = 'Yes';
    var btnCancelText = 'No';
    this.openConfirmationDialog(title, message, btnOkText, btnCancelText);
  }

  saveVideo(url) {
    var me = this;
    if (firebase.auth().currentUser) {
      var userId = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(userId).collection('videos').add({
        url: url,
        createdDate: new Date().getTime(),
        userId: userId
      })
        .then(function () {
          me.toastr.success('file uploaded successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-center',
          });
          me.resetScreen();
        })
        .catch(function (error) {
        });
    }
    else {
      firebase.firestore().collection("anonymous").add({
        url: url,
        createdDate: new Date().getTime(),
        userId: localStorage.getItem("guid")
      })
        .then(function () {
          me.toastr.success('file uploaded successfully', '', {
            timeOut: 2000,
            positionClass: 'toast-top-center',
          });
          me.resetScreen();
        })
        .catch(function (error) {
        });
    }
  }

  resetScreen() {
    this.uploadProgress = 0;
    this.recording = false;
    this.progress = false;
    this.isPlaying = false;
    this.upload = false;
    if (!firebase.auth().currentUser) {
      var title = 'Attention';
      var message = 'Please Login the app, if you want to share the video';
      var btnOkText = 'login';
      var btnCancelText = 'cancel';
      this.loginConfirmationDialog(title, message, btnOkText, btnCancelText);
    }

  }

  uploadVideoAsPromise(): any {
    var me = this;
    var recordedBlob = this.recordRTC.getBlob();
    me.progress = true;
    return new Promise(function (resolve, reject) {
      var uploadTask = firebase.storage().ref().child('videos').child(me.Guid()).put(recordedBlob);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
        me.uploadProgress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        if (me.uploadProgress == 100) {
          setTimeout(function () {
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              resolve(downloadURL);
            })
          }, 3000);
        }
      }), function (error) {
        console.log(error)
        reject(error);

      }
    });
  }

  Guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  public openConfirmationDialog(title, message, btnOkText, btnCancelText) {
    this.confirmationDialogService.confirm(title, message, btnOkText, btnCancelText)
      .then((confirmed) => {
        if (confirmed) {
          var me = this;
          me.uploadVideoAsPromise().then((videoUrl) => {
            me.saveVideo(videoUrl);
          }).catch((err) => {
            me.progress = false;
            me.toastr.error('file upload error', '', {
              timeOut: 2000,
              positionClass: 'toast-top-center',
            });
          });
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  public loginConfirmationDialog(title, message, btnOkText, btnCancelText) {
    this.confirmationDialogService.confirm(title, message, btnOkText, btnCancelText)
      .then((confirmed) => {
        if (confirmed) {
          this.router.navigate(['/login']);
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}