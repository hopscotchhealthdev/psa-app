import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { NgxLoadingModule } from 'ngx-loading';
import { VerifyEmailComponent } from './verify-email.component';
export const routes = [
  { path: '', component: VerifyEmailComponent, pathMatch: 'full'}
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxLoadingModule.forRoot({})
  ],
  declarations: [VerifyEmailComponent]
})
export class VerifyEmailModule { }
