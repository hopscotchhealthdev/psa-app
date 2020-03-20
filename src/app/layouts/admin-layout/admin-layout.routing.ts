import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { ProfileComponent } from './../../pages/profile/profile.component';
import { VideoRecoderComponent } from 'src/app/pages/video-recoder/video-recoder.component';
export const AdminLayoutRoutes: Routes = [
  { path: "home", component: DashboardComponent },
  { path: "profile", component: ProfileComponent },
  { path: "video-recorder", component: VideoRecoderComponent }

];
