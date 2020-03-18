import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from './forgot-password.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
export const routes = [
  { path: '', component: ForgotPasswordComponent, pathMatch: 'full'}
];
@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ForgotPasswordModule { }
