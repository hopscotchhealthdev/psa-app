import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { NgxLoadingModule } from 'ngx-loading';
export const routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({})
  ],
  declarations: [LoginComponent], 
})
export class LoginModule { }
