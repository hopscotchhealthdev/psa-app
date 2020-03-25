import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { AuthPhoneComponent } from './auth-phone.component';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
export const routes = [
  { path: '', component: AuthPhoneComponent, pathMatch: 'full'}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
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
