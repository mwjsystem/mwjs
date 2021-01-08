import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { NgxYubinBangoModule } from 'ngx-yubinbango';
import { environment } from './../environments/environment';
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
    McdtblComponent
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
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    AdredaComponent,
    McdhelpComponent
  ]
})
export class AppModule { }
