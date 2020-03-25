import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
import { LoginEmailComponent } from './login-emal.component';
export const routes = [
  { path: '', component: LoginEmailComponent, pathMatch: 'full'}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({})
  ],
  declarations: [LoginEmailComponent], 
})
export class LoginEmailModule { }
