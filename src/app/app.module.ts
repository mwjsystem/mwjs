import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeJa from '@angular/common/locales/ja';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material.module';
import { AuthModule } from '@auth0/auth0-angular';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './../environments/environment';
import { BeforeunloadGuard } from './beforeunload.guard';

import { GraphQLModule } from './common/graph-ql/graphql.module';
import { ToastrModule } from 'ngx-toastr'; 
import { NgxYubinBangoModule } from 'ngx-yubinbango';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TabDirective } from './common/tabidx/tab.directive';

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
import { GdstblComponent } from './pages/mstgoods/gdstbl.component';
import { GtnktblComponent } from './pages/mstgoods/gtnktbl.component';
import { JdatePipe } from './common/pipes/jdate.pipe';
import { JmeitblComponent } from './pages/frmsales/jmeitbl.component';
import { JmeitblbkComponent } from './pages/frmsales/jmeitblbk/jmeitblbk.component';
import { NuminputDirective } from './common/direcs/numinput.directive';
import { GcdinputDirective } from './common/direcs/gcdinput.directive';

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
    TmstmpComponent,
    TabDirective,
    GdstblComponent,
    GtnktblComponent,
    JdatePipe,
    JmeitblComponent,
    JmeitblbkComponent,
    NuminputDirective,
    GcdinputDirective
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
    ToastrModule.forRoot(),  
    MaterialModule,
    HttpClientModule,
    NgxYubinBangoModule,
    AutocompleteLibModule
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
