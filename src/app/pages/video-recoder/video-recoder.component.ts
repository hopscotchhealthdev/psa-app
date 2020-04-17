import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as RecordRTC from "recordrtc/recordrtc.min.js";
import * as firebase from "firebase";
import { Observable, merge } from 'rxjs';
import { ConfirmationDailogService } from '../confirmation-dailog/confirmation-dailog.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TextDailogService } from '../text-dialog/text-dialog.service';
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
const apiUrl = "https://psa-backend-server.hopscotchhealth.co/overlay-videos";

declare var window: any;
@Component({
  selector: 'app-video-recoder',
  templateUrl: './video-recoder.component.html',
  styleUrls: ['./video-recoder.component.scss']
})
export class VideoRecoderComponent implements OnInit {
  private stream: MediaStream;
  private recordRTC: any;
  uploadProgress: any;
  recording: boolean = false;
  timecountStart: any;
  counter: any;
  timecount;
  upload = false;
  timerSeconds: any;
  @ViewChild('video') video;
  img: any;
  videoData: any;
  markText: string = "";
  currentStatus: number = 0;
  psaData = {
    id: '',
    name: '',
    overlay_videos: '',
    uploadSeconds: 0,
    data: [],
    description: ''

  };
  loading = false;
  animation: boolean = false;
  timeout: any;
  browserFailed: string = '';
  isSafariBrowser: boolean = false;
  processText: string = "";
  subscribe: any;
  private ngUnsubscribe = new Subject<void>();
  constructor(private translate: TranslateService, private http: HttpClient, private route: ActivatedRoute, private textDailogService: TextDailogService, private confirmationDialogService: ConfirmationDailogService, private router: Router, private activatedRoute: ActivatedRoute, private toastr: ToastrService) {

  }
  ngOnInit() {
    let me = this;
    let browser: any = (function () {
      var ua = navigator.userAgent, tem,
        M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE ' + (tem[1] || '');
      }
      if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
        if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
      if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
      return M.join(' ');
    })();
    if (browser.toLowerCase().indexOf('safari') > -1) {
      me.isSafariBrowser = true;
    }
    this.subscribe = this.route.queryParamMap.subscribe(params => {
      if (params.get("id")) {
        me.startCamera();
        me.loading = true;

        firebase.firestore().collection("psa").doc(params.get("id")).get().then(function (querySnapshot) {
          me.loading = false;
          if (querySnapshot.exists) {
            me.psaData.data = querySnapshot.data().time;
            me.psaData.name = querySnapshot.data().name;
            me.psaData.overlay_videos = querySnapshot.data().overlay_videos;
            me.psaData.id = querySnapshot.id;
            me.psaData.description = querySnapshot.data().description;
            me.psaData.uploadSeconds = querySnapshot.data().uploadSeconds;
            me.translate
            .get("video_recorder")
            .pipe(takeUntil(me.ngUnsubscribe))
            .subscribe((translation: any) => {
              if(!me.browserFailed)
              me.textDailogService.open(`<img  class='hit-img' src='assets/img/play.png'/>${translation.play_prompt}`, "", translation.got_it);  
            });
          }
          else {
            me.router.navigate(["/psa-list"]);
          }
        });
      }
      else {
        me.router.navigate(["/psa-list"]);
      }
    })

  }
  back() {
    this.router.navigate(["/psa-list"]);

  }

  fetchOutputUrl(url, id, count) {
    const me = this;
    let bucketUrl = "videos/output/" + url;
    var uploadTask = firebase.storage().ref().child(bucketUrl);
    uploadTask.getDownloadURL().then(function (downloadURL) {
      me.updateVideoData(id, `https://storage.googleapis.com/${firebase.storage().ref().bucket}/${bucketUrl}`, 1);
    }).catch(function (error) {
      setTimeout(() => {
        if (count > 250) {
          me.updateVideoData(id, null, 2);
        } else {
          me.fetchOutputUrl(url, id, count + 1);
        }
      }, 4000);
    })
  }

  ngOnDestroy() {
    if (this.timecount) {
      clearInterval(this.timecount);
    }
    if (this.timecountStart) {
      clearInterval(this.timecountStart);
    }
    if (this.counter) {
      clearInterval(this.counter);
    }
    let stream = this.stream;
    if (stream) {
      stream.getAudioTracks().forEach(track => track.stop());
      stream.getVideoTracks().forEach(track => track.stop());

    }
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    this.recordRTC = null;
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'video/webm',
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = stream;
    video.muted = true;
    video.controls = false;
    video.autoplay = true;
    video.setAttribute("playsinline", "true");
  }

  verifyRecording() {
    let me = this;
    if (this.isSafariBrowser) {
      me.loading = true;
      setTimeout(() => {
        if (me.recordRTC.state == "recording") {
          me.recordRTC.stopRecording();
          me.loading = false;
          me.startRecordingProcess();
        } else {
          me.router.navigate(["/psa-list"], { queryParams: { instruction: true }, skipLocationChange: true });
        }
      }, 1200);
      me.recordRTC.startRecording();
    } else {
      me.startRecordingProcess();
    }
  }


  startRecordingProcess() {
    let me = this;
    if (this.animation) {
      this.animation = false;
      this.resetScreen();
      if (this.timecountStart) {
        clearInterval(this.timecountStart);
      }
    } else {
      this.animation = true;

      var timeleft = 5;
      me.timecountStart = setInterval(function () {
        if (timeleft <= 0) {
          clearInterval(me.timecountStart);
          me.recordRTC.startRecording();
          me.animation = false;
          me.startTimer();
          me.recording = true;
        } else {
          let el = document.getElementById("countdown");
          if (el) {
            el.innerHTML = timeleft.toString();
          }
        }
        timeleft -= 1;
      }, 1000);

    }
  }

  errorCallback(error) {
    this.loading = false;
    this.translate
      .get("messages")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((translation: any) => {
        this.textDailogService.close();
        if (error.name == 'NotAllowedError' || error.name == 'PermissionDeniedError') {
          this.browserFailed = `<p>${translation.permission}</p><img style='margin:10px;' src="assets/img/permission.gif" />`;
        //  this.router.navigate(["/psa-list"], { queryParams: { instruction: true, type: 'PermissionDeniedError' }, skipLocationChange: true });
        }
        else if (this.isSafariBrowser) {
          this.browserFailed = error.message + translation.safari;
        }
        else {
          this.browserFailed = error.message;
        }
      });

  }

  processVideoPrompt() {
    this.translate
      .get("video_recorder")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((translation: any) => {
        this.openConfirmationDialog(translation.upload_prompt, "", translation.upload, translation.re_record);
      });



  }

  processVideo() {
    const me = this;
    let recordRTC = this.recordRTC;
    if (!firebase.auth().currentUser) {
      me.loading = true;
      firebase.auth().signInAnonymously().catch(function (error) {
        // Handle Errors here.
        me.loading = false;
        var errorCode = error.code;
        var errorMessage = error.message;
        me.toastr.error(errorMessage, '', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      }).then(function (res) {
        me.loading = false;
        var userId = firebase.auth().currentUser.uid;
        firebase.firestore().collection("users").doc(userId).set({ createdDate: new Date() })
        me.uploadVideo();
      });
    }
    else {
      me.uploadVideo();
    }
  }

  defaultHeaders() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
  }

  uploadVideo() {
    const me = this;
    me.uploadVideoAsPromise().then((video) => {
      const param = {
        "org_video": `${decodeURI(video.downloadURL)}`,
        "overlay_videos": me.psaData.overlay_videos,
        "psa_id": me.psaData.id
      }
      me.http
        .post(`${apiUrl}`, param, me.defaultHeaders())
        .subscribe(
          (data: any) => {
            me.addVideoData(video, data.file_name, 2).then((uniqueId) => {
              me.fetchOutputUrl(data.file_name, uniqueId, 0);
            })
          },
          error => {
            this.processError(error);
          }
        );

    }).catch((err) => {
      me.currentStatus = 0;
      this.translate
      .get("messages")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((translation: any) => {
        me.toastr.error(translation.file_error, '', {
          timeOut: 2000,
          positionClass: 'toast-top-center',
        });
      });
     
    });
  }

  processError(error) {
    this.translate
    .get("messages")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((translation: any) => {
      this.toastr.error(translation.api_error, '', {
        timeOut: 2000,
        positionClass: 'toast-top-center',
      });
    });
    
    this.router.navigate(['/home']);
  }


  startCamera() {
    this.upload = false;
    let mediaConstraints: any = {
      video: {
        width: 640,
        height: 480
      },
      audio: true,
    };
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (!navigator.mediaDevices) {
      this.translate
      .get("messages")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((translation: any) => {
        if (/android/i.test(userAgent)) {
          this.browserFailed = translation.android_browser;
        }
        else {
          this.browserFailed = translation.safari_browser;
        }
      });
    } else {
      navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successCallback.bind(this), this.errorCallback.bind(this));
    }
  }

  stopRecording() {
    let recordRTC = this.recordRTC;
    if (recordRTC)
      recordRTC.stopRecording(this.processVideoPrompt.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
    this.recording = false;
    this.pauseTimer();
  }

  stopConfirmRecording() {
    if (!this.isSafariBrowser) {
      this.recordRTC.pauseRecording();
      clearInterval(this.counter); 
      const me = this;
      
      me.translate
      .get("video_recorder")
      .pipe(takeUntil(me.ngUnsubscribe))
      .subscribe((translation: any) => {
        this.confirmationDialogService.confirm(`${translation.attention}!`, "", translation.continue,translation.reset )
        .then((confirmed) => {
          if (confirmed) {
            me.recordRTC.resumeRecording();
            me.startTimer(me.timerSeconds);

          } else {
            me.resetScreen();
          }
        })
        .catch(() => { }); 
      });

     
    }
  }

  download() {
    this.recordRTC.save('video.webm;codecs=vp9');
  }

  pauseTimer() {
    if (this.counter) {
      clearInterval(this.counter);
    }
    this.timecount = 0;
  }

  startTimer(seconds?) {
    var count = seconds ? seconds : '1'; // it's 00:01:02
    this.counter = setInterval(timer, 1000);
    var me = this;
    function timer() {
      if (parseInt(count) <= 0) {
        clearInterval(me.counter);
        return;
      }
      me.timecount = me.getHHMMSS(count);
      me.timerSeconds = count = (parseInt(count) + 1).toString();
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
    var time = this.pad(minutes) + ':' + this.pad(seconds);

    let filter = this.psaData.data.filter(o => o.min <= count && o.max >= count)[0];
    if (filter) {
      this.markText = filter.title;
    } else {
      this.markText = "";
    }
    if (this.psaData.uploadSeconds == count) {
      this.stopRecording();
    }
    return time;
  }

  pad(n) {
    return (n < 10) ? ("0" + n) : n;
  }

  /* public uploadvideo() {
     var title = 'please confirm...';
     var message = 'Are you sure you want to upload this video?';
     var btnOkText = 'Yes';
     var btnCancelText = 'No';
     this.openConfirmationDialog(title, message, btnOkText, btnCancelText);
   }*/

  addVideoData(video, outputVideoId, status) {
    const me = this;
    return new Promise(function (resolve, reject) {
      var userId = firebase.auth().currentUser.uid;
      firebase.firestore().collection("users").doc(userId).collection('videos').add({
        url: video.downloadURL,
        videoId: video.videoId,
        createdDate: new Date(),
        userId: userId,
        psaId: me.psaData.id,
        psaName: me.psaData.name,
        description: me.psaData.description,
        outputVideoId: outputVideoId,
        status: 2
      })
        .then(function (data) {
          resolve(data.id);
        })
        .catch(function (error) {
          me.processError(error);
        });
    })
  }


  updateVideoData(id, outputURL, status) {
    var userId = firebase.auth().currentUser.uid;
    const me = this;
    firebase.firestore().collection("users").doc(userId).collection('videos').doc(id).update({
      outputUrl: outputURL,
      status: status
    })
      .then(function () {
        if (status == 1) {
          me.translate
          .get("messages")
          .pipe(takeUntil(me.ngUnsubscribe))
          .subscribe((translation: any) => {
            me.toastr.success(translation.file_success, '', {
              timeOut: 2000,
              positionClass: 'toast-top-center',
            });
          });
          me.router.navigate(['home'], { queryParams: { videoId: id }, skipLocationChange: true });

        } else {
          me.translate
          .get("messages")
          .pipe(takeUntil(me.ngUnsubscribe))
          .subscribe((translation: any) => {
            me.toastr.error(translation.processing, '', {
              timeOut: 2000,
              positionClass: 'toast-top-center',
            });
          });
         
          me.router.navigate(['/home']);
        }
      })
      .catch(function (error) {
        me.router.navigate(['/home'])
      });
  }

  resetScreen() {
    this.uploadProgress = 0;
    this.recording = false;
    this.currentStatus = 0;
    this.upload = false;
    this.markText = '';
    this.timecount = 0;
    this.processText = "";
    if (this.recordRTC) {
      this.recordRTC.stopRecording();
      this.startCamera();
    }
    this.pauseTimer();
    let stream = this.stream;
    if (stream) {
      stream.getAudioTracks().forEach(track => track.stop());
      stream.getVideoTracks().forEach(track => track.stop());
    }
  }


  uploadVideoAsPromise(): any {
    var me = this;
    var recordedBlob = this.recordRTC.getBlob();
    me.currentStatus = 1;
    return new Promise(function (resolve, reject) {
      const videoId = me.Guid();
      var uploadTask = firebase.storage().ref().child('videos').child(videoId).put(recordedBlob);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
        me.uploadProgress = parseInt((snapshot.bytesTransferred / snapshot.totalBytes * 100).toString());
        if (me.uploadProgress == 100) {
          me.translate
            .get("messages")
            .pipe(takeUntil(me.ngUnsubscribe))
            .subscribe((translation: any) => {
              me.processText = translation.processing_prompt
              setTimeout(() => {
                me.processText = `<b>${translation.server_prompt}</b>`;
              }, 1000 * 60);
            });
        }

      }, function (error) {
        // Handle unsuccessful uploads
        reject(error);
      }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        setTimeout(function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            resolve({
              downloadURL: downloadURL,
              videoId: videoId
            });
          })
        }, 1000);

      });
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
    let me = this;
    this.confirmationDialogService.confirm(title, message, btnOkText, btnCancelText)
      .then((confirmed) => {
        if (confirmed) {
          me.processVideo();
        } else {
          me.resetScreen();

        }
      })
      .catch(() => {
        me.resetScreen();
      });
  }



}