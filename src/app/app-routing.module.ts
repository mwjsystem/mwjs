import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';;
import { CommonModule } from '@angular/common';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'frmclear', loadChildren: () => import('./frmclear/frmclear.module').then(m => m.FrmclearModule), canActivate: [AuthGuard] },
  { path: 'frmdeposit', loadChildren: () => import('./frmdeposit/frmdeposit.module').then(m => m.FrmdepositModule), canActivate: [AuthGuard] },
  { path: 'frminvoice', loadChildren: () => import('./frminvoice/frminvoice.module').then(m => m.FrminvoiceModule), canActivate: [AuthGuard] },
  { path: 'frmkeep', loadChildren: () => import('./frmkeep/frmkeep.module').then(m => m.FrmkeepModule), canActivate: [AuthGuard] },
  { path: 'frmmove', loadChildren: () => import('./frmmove/frmmove.module').then(m => m.FrmmoveModule), canActivate: [AuthGuard] },
  { path: 'frmsales', loadChildren: () => import('./frmsales/frmsales.module').then(m => m.FrmsalesModule), canActivate: [AuthGuard] },
  { path: 'frmsiire', loadChildren: () => import('./frmsiire/frmsiire.module').then(m => m.FrmsiireModule), canActivate: [AuthGuard] },
  { path: 'frmsupply', loadChildren: () => import('./frmsupply/frmsupply.module').then(m => m.FrmsupplyModule), canActivate: [AuthGuard] },
  { path: 'frmtreat', loadChildren: () => import('./frmtreat/frmtreat.module').then(m => m.FrmtreatModule), canActivate: [AuthGuard] },
  { path: 'mstgoods', loadChildren: () => import('./mstgoods/mstgoods.module').then(m => m.MstgoodsModule), canActivate: [AuthGuard] },
  { path: 'mstmember', loadChildren: () => import('./mstmember/mstmember.module').then(m => m.MstmemberModule), canActivate: [AuthGuard] },
  { path: 'mstvendor', loadChildren: () => import('./mstvendor/mstvendor.module').then(m => m.MstvendorModule), canActivate: [AuthGuard] },
  { path: 'repstock', loadChildren: () => import('./repstock/repstock.module').then(m => m.RepstockModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
