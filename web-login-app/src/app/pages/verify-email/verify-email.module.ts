import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { VerifyEmailComponent } from './verify-email.component';
import { HttpClientModule,HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export const routes = [
  { path: '', component: VerifyEmailComponent, pathMatch: 'full'}
];
export function setTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
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
  declarations: [VerifyEmailComponent]
})
export class VerifyEmailModule { }
