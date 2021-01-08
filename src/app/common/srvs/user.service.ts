import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: {[key: string]: any} = {};
  compid:number;
  constructor(public auth: AuthService) {
    this.auth.user$.subscribe(user => {
      this.userInfo = user;
      this.compid=this.userInfo['https://userids'][0]
      console.log(this.userInfo,this.compid);
    })
   }

  logout(): void {
    // Call this to log the user out of the application
    this.auth.logout({ returnTo: window.location.origin });
  }
}
