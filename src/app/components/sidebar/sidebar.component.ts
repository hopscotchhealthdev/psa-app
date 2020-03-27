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
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/psa-list",
    title: "Video Recoder",
    icon: "icon-pin",
    class: ""
  },
  {
    path: "/profile",
    title: "Profile",
    icon: "icon-single-02",
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
