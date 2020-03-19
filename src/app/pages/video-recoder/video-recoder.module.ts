import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { NgxLoadingModule } from 'ngx-loading';
import { VideoRecoderComponent } from './video-recoder.component';

export const routes = [
  { path: '', component: VideoRecoderComponent, pathMatch: 'full'}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({})
  ],
  declarations: [VideoRecoderComponent]
})
export class VideoRecoderModule { }


