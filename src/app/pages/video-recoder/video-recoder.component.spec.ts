import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoRecoderComponent } from './video-recoder.component';

describe('VideoRecoderComponent', () => {
  let component: VideoRecoderComponent;
  let fixture: ComponentFixture<VideoRecoderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoRecoderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoRecoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
