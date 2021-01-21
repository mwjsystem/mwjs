import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgxYubinBangoModule } from 'ngx-yubinbango';
import { environment } from './../environments/environment';
import { BeforeunloadGuard } from './beforeunload.guard';
import { GraphQLModule } from './common/graph-ql/graphql.module';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FrmsalesComponent } from './pages/frmsales/frmsales.component';
import { MstgoodsComponent } from './pages/mstgoods/mstgoods.component';
import { MstmemberComponent } from './pages/mstmember/mstmember.component';
import { AddressComponent } from './common/address/address.component';
import { AdredaComponent } from './dialog/adreda/adreda.component';
import { McdhelpComponent } from './dialog/mcdhelp/mcdhelp.component';
import { McdtblComponent } from './dialog/mcdhelp/mcdtbl.component';
import { EdahelpComponent } from './dialog/adreda/edahelp.component';
import { EdatblComponent } from './dialog/adreda/edatbl.component';
import { TmstmpComponent } from './common/tmstmp/tmstmp.component';

registerLocaleData(localeJa);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    FrmsalesComponent,
    MstgoodsComponent,
    MstmemberComponent,
    AddressComponent,
    AdredaComponent,
    McdhelpComponent,
    McdtblComponent,
    EdahelpComponent,
    EdatblComponent,
    TmstmpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      domain: environment.AUTH0_DOMAIN,
      clientId: environment.AUTH0_CLIENT_ID,
      redirectUri: `${window.location.origin}`
    }),
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    GraphQLModule,
    MaterialModule,
    HttpClientModule,
    NgxYubinBangoModule
  ],
  providers: [BeforeunloadGuard ,{ provide: LOCALE_ID, useValue: 'ja-JP' }],
  bootstrap: [AppComponent],
  entryComponents: [
    AdredaComponent,
    McdhelpComponent,
    EdahelpComponent
  ]
})
export class AppModule { }
