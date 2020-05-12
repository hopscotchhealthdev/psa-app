import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from "firebase";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationDailogService } from '../../pages/confirmation-dailog/confirmation-dailog.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  toggleOn: boolean = false;
  public user = {
    userName: "",
    image: "assets/img/anime3.png",
    gender: "",

  };
  isAnonymous: boolean = true;
  private ngUnsubscribe = new Subject<void>();
  constructor(location: Location,
    private router: Router,
    private modalService: NgbModal,
    public translate: TranslateService,
    private confirmationDialogService: ConfirmationDailogService
  ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    firebase.auth().onAuthStateChanged((user) => {
      let me = this;
      if (user) {
        if (user.isAnonymous) {
          this.isAnonymous = true;
          me.user.userName = "Anonymous";
        } else {
          this.isAnonymous = false;
          firebase
            .firestore().collection("users").doc(user.uid).onSnapshot((userRef) => {
              if (userRef.exists) {
                me.user.userName = userRef.data().userName;
                me.user.image = userRef.data().image ? userRef.data().image : "assets/img/anime3.png"
              }
              else {
                me.user.image = "assets/img/anime3.png"
              }
            });
        }
      } else {
        me.user.userName = "Anonymous";
        this.isAnonymous = true;
      }
    })
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  logout() {
    firebase.auth().signOut().then((userRef) => {
      this.router.navigate(['/']);
    })
  }

  showHide() {
    this.toggleOn = !this.toggleOn;
  }

  goToLogin() {
    this.translate
      .get("terms")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((translation: any) => {
        this.confirmationDialogService.confirm(translation.agree, `${translation.readout} <a  href='../home/terms-and-conditions.html' target='_blank;'><b style='color: #314DBD;font-weight: 700;'>${translation.terms}</b></a>`, translation.accept, translation.decline)
          .then((confirmed) => {
            if (confirmed) {
              window.location.href = `${window.location.origin}/login/index.html`
            }
          });

      });


  }


}
