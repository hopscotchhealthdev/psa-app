import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as RecordRTC from "recordrtc/recordrtc.min.js";

@Component({
  selector: 'app-video-recoder',
  templateUrl: './video-recoder.component.html',
  styleUrls: ['./video-recoder.component.scss']
})
export class VideoRecoderComponent implements OnInit {
  private stream: MediaStream;
  private recordRTC: any;
   recording: boolean=false;
   isPlaying=false;
   counter:any;
   timecount;
  @ViewChild('video') video;
  @ViewChild('videoPlay') videoPlay;
  constructor() {}
  ngOnInit(){
  }
  ngAfterViewInit() {

  }

  successCallback(stream: MediaStream) {
    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
  //    audioBitsPerSecond: 128000,
   //   videoBitsPerSecond: 128000,
   //   bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.srcObject = this.stream;
    video.muted = true;
    video.controls = false;
    video.autoplay = true;
    this.recording=true;
    this.isPlaying=false;
    this.startTimer();
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
    let mediaConstraints:any = {
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
    this.recording=false;
    this.isPlaying=true;
    this.pauseTimer();
  }

  download() {
    this.recordRTC.save('video.webm');
  }
  pauseTimer() {
    clearInterval(this.counter);
    this.timecount=0;
  }
  startTimer(){ 
    this.timecount=0; 
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
    getHHMMSS(count){
      var sec_num = parseInt(count, 10); // don't forget the second parm
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours *3600) - (minutes * 60);
  
      if (hours < 10) {
          hours = 0 + hours;
      }
      if (minutes < 10) {
          minutes = 0 + minutes;
      }
      if (seconds < 10) {
          seconds = 0 + seconds;
      }
      var time = hours + ':' + minutes + ':' + seconds;
      return time;
    }
}