import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FrmsalesComponent } from './pages/frmsales/frmsales.component';
import { MstgoodsComponent } from './pages/mstgoods/mstgoods.component';
import { MstmemberComponent } from './pages/mstmember/mstmember.component';
import { BeforeunloadGuard } from './beforeunload.guard';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'frmsales', component: FrmsalesComponent, canActivate: [AuthGuard] },
  { path: 'mstgoods', component: MstgoodsComponent, canActivate: [AuthGuard] },
  { path: 'mstgoods/:mode/:mcd', component: MstgoodsComponent, canActivate: [AuthGuard], canDeactivate: [BeforeunloadGuard] },
  { path: 'mstmember', component: MstmemberComponent, canActivate: [AuthGuard] },
  { path: 'mstmember/:mode/:mcd', component: MstmemberComponent, canActivate: [AuthGuard], canDeactivate: [BeforeunloadGuard] },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
