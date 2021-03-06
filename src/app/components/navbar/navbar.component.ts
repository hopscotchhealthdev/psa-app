import { Component, OnInit, ElementRef, OnDestroy } from "@angular/core";
//import { ROUTES } from "../sidebar/sidebar.component";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as firebase from "firebase";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import { ConfirmationDailogService } from '../../pages/confirmation-dailog/confirmation-dailog.service';
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  private listTitles: any[];
  location: Location;
  mobile_menu_visible: any = 0;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public user = {
    userName: "",
    image: "",
    gender: "",
  
  };
  public isCollapsed = true;
  isAnonymous:boolean=true;
  closeResult: string;
  private ngUnsubscribe = new Subject<void>();
  lang:string= localStorage.getItem("language");
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private modalService: NgbModal,
    public translate: TranslateService,
    private confirmationDialogService: ConfirmationDailogService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    var navbar = document.getElementsByClassName('navbar')[0];
    if (window.innerWidth < 993 && !this.isCollapsed) {
     // navbar.classList.add('bg-white');
     // navbar.classList.remove('navbar-transparent');
    } else {
      navbar.classList.remove('bg-white');
      navbar.classList.add('navbar-transparent');
    }
  };

  openLang() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  ngOnInit() {
    // window.addEventListener("resize", this.updateColor);
   // this.listTitles = ROUTES.filter(listTitle => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.router.events.subscribe(event => {
      this.sidebarClose();
      var $layer: any = document.getElementsByClassName("close-layer")[0];
      if ($layer) {
        $layer.remove();
        this.mobile_menu_visible = 0;
      }
    });

  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event:any) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

    
    firebase.auth().onAuthStateChanged((user) => {
      let me = this;
      if (user) {
        if (user.isAnonymous) {
          this.isAnonymous = true;
          me.user.userName = "Anonymous";
        }else{
          this.isAnonymous = false;  
          firebase
          .firestore().collection("users").doc(user.uid).onSnapshot((userRef) => {
            if(userRef.exists){
              me.user.userName = userRef.data().userName;
              me.user.image = userRef.data().image ? userRef.data().image : "assets/img/anime3.png"
            }
            else{
              me.user.image ="assets/img/anime3.png"
            }
            });        
        }
      }else{
      
        me.user.userName = "Anonymous";
        this.isAnonymous = true;                  
      }
    })

  }
profileCollapse(){
  if (window.innerWidth < 993){
    this.collapse();
  }
}

  logout(){
    if (window.innerWidth < 993){
      this.collapse();
    }
    firebase.auth().signOut().then((userRef) => {
      this.router.navigate(['/']);
    })
  }

  goToLogin() {
    this.translate
    .get("terms")
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((translation: any) => {
      this.confirmationDialogService.confirm(translation.agree, `${translation.readout} <a  href='https://google.com' target='_blank;'><b style='color: #314DBD;font-weight: 700;'>${translation.terms}</b></a>`,translation.accept ,translation.decline)
      .then((confirmed) => {
        if (confirmed) {
          window.location.href = `${window.location.origin}/login/index.html`
        }
      });

    });
  
 
  }

  
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName("nav")[0];
    if (!this.isCollapsed) {
   //  navbar.classList.remove("navbar-transparent");
  navbar.classList.add("bg-white");
    } else {
  //   navbar.classList.add("navbar-transparent");
      navbar.classList.remove("bg-white");
    }
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );
    const html = document.getElementsByTagName("html")[0];
    if (window.innerWidth < 991) {
     // mainPanel.style.position = "fixed";
    }

    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);

    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    const mainPanel = <HTMLElement>(
      document.getElementsByClassName("main-panel")[0]
    );

    if (window.innerWidth < 991) {
      setTimeout(function () {
     //   mainPanel.style.position = "";
      }, 500);
    }
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const html = document.getElementsByTagName('html')[0];
    var $toggle = document.getElementsByClassName("navbar-toggler")[0];

    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
    const html = document.getElementsByTagName("html")[0];

    if (this.mobile_menu_visible == 1) {
      // $('html').removeClass('nav-open');
      html.classList.remove("nav-open");
      if ($layer) {
        $layer.remove();
      }
      setTimeout(function () {
        $toggle.classList.remove("toggled");
      }, 400);

      this.mobile_menu_visible = 0;
    } else {
      setTimeout(function () {
        $toggle.classList.add("toggled");
      }, 430);

      var $layer = document.createElement("div");
      $layer.setAttribute("class", "close-layer");

      if (html.querySelectorAll(".main-panel")) {
        document.getElementsByClassName("main-panel")[0].appendChild($layer);
      } else if (html.classList.contains("off-canvas-sidebar")) {
        document
          .getElementsByClassName("wrapper-full-page")[0]
          .appendChild($layer);
      }

      setTimeout(function () {
        $layer.classList.add("visible");
      }, 100);

      $layer.onclick = function () {
        //asign a function
        html.classList.remove("nav-open");
        this.mobile_menu_visible = 0;
        $layer.classList.remove("visible");
        setTimeout(function () {
          $layer.remove();
          $toggle.classList.remove("toggled");
        }, 400);
      }.bind(this);

      html.classList.add("nav-open");
      this.mobile_menu_visible = 1;
    }
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  open(content) {
    this.modalService.open(content, { windowClass: 'modal-search' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnDestroy() {
    window.removeEventListener("resize", this.updateColor);
  }
  languageChange(value){
    this.translate.use(value);
    localStorage.setItem("language",value)
   }
}
