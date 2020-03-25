import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as RecordRTC from "recordrtc/recordrtc.min.js";
import * as firebase from "firebase";
import { Observable } from 'rxjs';
import { ConfirmationDailogService } from '../confirmation-dailog/confirmation-dailog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  loginUser = true;
  psaData = [];
  loading=false;
  constructor(private route: ActivatedRoute, private confirmationDialogService: ConfirmationDailogService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {

  }
  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.isAnonymous) {
          this.loginUser = false;
        } else {
          this.loginUser = true;
        }
      } else {
        this.loginUser = false;

      }
    })
    let me = this;
    this.route.queryParamMap.subscribe(params => {
      if (params.get("id")) {
        me.loading=true;
        firebase.firestore().collection("psa").doc(params.get("id")).get().then(function (querySnapshot) {
        me.loading=false;          
          if (querySnapshot.exists) {
            me.psaData = querySnapshot.data().time;
          }

        });
      }
    })

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

    let filter = this.psaData.filter(o => o.min <= count && o.max >= count)[0];
    if (filter) {
      this.markText = filter.title;
    } else {
      this.markText = "";
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
      // create Anonymously user
      firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      }).then(function (res) {
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
          .catch(function (error) { });
      });

    }
  }

  resetScreen() {
    this.uploadProgress = 0;
    this.recording = false;
    this.progress = false;
    this.isPlaying = false;
    this.upload = false;
    this.markText = '';
    if (firebase.auth().currentUser.providerData.length == 0) {
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
          this.goToLogin();
        }
      })
      .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  goToLogin() {
    window.location.href = `${window.location.origin}/login/index.html`
  }
}