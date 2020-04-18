import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { AuthPhoneComponent } from './auth-phone.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule,HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
export const routes = [
  { path: '', component: AuthPhoneComponent, pathMatch: 'full'}
];
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: setTranslateLoader,
        deps: [HttpClient]
      }
    }),
    SweetAlert2Module.forRoot({
      buttonsStyling: true,
      customClass: "modal-content",
      confirmButtonClass: "btn btn-primary",
      cancelButtonClass: "btn"
  }),
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({})
  ],
  declarations: [AuthPhoneComponent], 
})
export class AuthPhoneModule { }
