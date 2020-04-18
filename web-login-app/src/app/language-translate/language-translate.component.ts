import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-translate',
  templateUrl: './language-translate.component.html',
  styleUrls: ['./language-translate.component.scss']
})
export class LanguageTranslateComponent implements OnInit {

  constructor(private translate:TranslateService) { }

  ngOnInit(): void {

      var me = this;
      let lang = localStorage.getItem("language");
      if (lang) {
        this.translate.setDefaultLang(lang);
        this.translate.use(lang);
      } else {
        localStorage.setItem("language","en");
        this.translate.setDefaultLang("en");
        this.translate.use("en");
      }
    
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
  }
  openLang() {
    document.getElementById("myDropdown").classList.toggle("show");
  }

  languageChange(value){
    this.translate.use(value);
    localStorage.setItem("language",value)
   }


}
