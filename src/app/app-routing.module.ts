import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;
import { CommonModule } from '@angular/common';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'repstock', loadChildren: () => import('./repstock/repstock.module').then(m => m.RepstockModule), canActivate: [AuthGuard] },
  { path: 'mstgoods', loadChildren: () => import('./mstgoods/mstgoods.module').then(m => m.MstgoodsModule), canActivate: [AuthGuard] },
  { path: 'mstmember', loadChildren: () => import('./mstmember/mstmember.module').then(m => m.MstmemberModule), canActivate: [AuthGuard] },
  { path: 'mstvendor', loadChildren: () => import('./mstvendor/mstvendor.module').then(m => m.MstvendorModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
