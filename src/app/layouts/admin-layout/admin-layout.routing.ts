import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";
import { ProfileComponent } from './../../pages/profile/profile.component';
import { VideoRecoderComponent } from 'src/app/pages/video-recoder/video-recoder.component';
import { PsaListComponent } from '../../pages/psa-list/psa-list.component';
export const AdminLayoutRoutes: Routes = [
  { path: "", component: VideoRecoderComponent },
  { path: "psa-list", component: PsaListComponent },      
  { path: "home", component: DashboardComponent },
  { path: "profile", component: ProfileComponent },
  { path: "video-recorder", component: VideoRecoderComponent }

];
