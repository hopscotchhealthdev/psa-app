import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule,HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
//import { ComponentsModule } from "./components/components.module";
import * as firebase from "firebase";
import { firebase_config } from 'src/config/config';
import { NgxLoadingModule,ngxLoadingAnimationTypes} from 'ngx-loading';
import {APP_BASE_HREF} from '@angular/common';
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageTranslateComponent } from './language-translate/language-translate.component';


firebase.initializeApp(firebase_config);
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  imports: [
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: setTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    //ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#314dbd', 
      secondaryColour: '#314dbd', 
      tertiaryColour: '#314dbd'
    })
 ],
  declarations: [AppComponent, LanguageTranslateComponent],
  providers: [{provide: APP_BASE_HREF, useValue : '/login' }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
