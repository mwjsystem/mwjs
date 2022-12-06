import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AuthModule } from '@auth0/auth0-angular';
import { Apollo } from 'apollo-angular';
import { HttpClientModule } from '@angular/common/http';
import { BeforeunloadGuard } from './beforeunload.guard';
import { GraphQLModule } from './graphql.module';
import { ToastrModule } from 'ngx-toastr';
import { environment } from './../environments/environment';

import { UserService } from './services/user.service';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent
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
    GraphQLModule,
    HttpClientModule,
    ToastrModule.forRoot(),

    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [
    Apollo,
    UserService,
    BeforeunloadGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
