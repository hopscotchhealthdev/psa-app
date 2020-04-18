import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { HttpClientModule,HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: setTranslateLoader,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({})
  ],
  declarations: [LoginComponent], 
})
export class LoginModule { }
