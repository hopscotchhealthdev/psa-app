import { VideoRecoderComponent } from './../../pages/video-recoder/video-recoder.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { ProfileComponent } from './../../pages/profile/profile.component';
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxLoadingModule } from 'ngx-loading';

import { NgxAudioPlayerModule } from 'ngx-audio-player';
import { MaterialModule } from 'src/app/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxPaginationModule,
    NgxAudioPlayerModule,
    MaterialModule,
    NgxLoadingModule.forRoot({}),
    NgCircleProgressModule.forRoot({
    }),
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    VideoRecoderComponent
  
    // RtlComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdminLayoutModule { }
