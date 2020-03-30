import { Component, OnInit } from "@angular/core";
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/home",
    title: "HomePage",
    icon: "assets/img/psa-home-64x64.png",
    class: ""
  },
  {
    path: "/psa-list",
    title: "Video Recoder",
    icon: "assets/img/psa-video_recorder-64x64.png",
    class: ""
  },
  {
    path: "/profile",
    title: "Profile",
    icon: "assets/img/psa-profile-64x64.png",
    class: ""
  },
  
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
