import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule,ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule,HttpClient } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import * as firebase from "firebase";
import { firebase_config } from 'src/config/config';
import { NgxLoadingModule,ngxLoadingAnimationTypes } from 'ngx-loading';
import {APP_BASE_HREF} from '@angular/common';
import bugsnag from '@bugsnag/js';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BugsnagErrorHandler } from '@bugsnag/plugin-angular';

firebase.initializeApp(firebase_config);
const bugsnagClient = bugsnag('922cc307a94bece2a2e39a2ba1704091')
export function errorHandlerFactory() {
  return new BugsnagErrorHandler(bugsnagClient)
}
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: setTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#314dbd', 
      secondaryColour: '#314dbd', 
      tertiaryColour: '#314dbd'
    })
 ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent],
  providers: [{provide: {APP_BASE_HREF,ErrorHandler}, useValue : '/recorder', useFactory: errorHandlerFactory }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  
})
export class AppModule {}
