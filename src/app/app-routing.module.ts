import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

const routes: Routes = [
  
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'forgot-password', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
     {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
