import { Component, OnInit } from '@angular/core';
import { UserService } from '../srvs/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public userSrv:UserService) { }

  ngOnInit():void {
    const color:string = localStorage.getItem(this.userSrv.userInfo.nickname + 'MWJS_COLOR');
    if ( color !== null ){this.setColor(color);}
  }
  setColor(colorname:string):void {
    var links = document.getElementsByTagName("link"); 
    for(var i=0; i < links.length; i++) {
        var link = links[i];
        if (link.id=='themeAsset') {
          link.href = 'https://unpkg.com/@angular/material/prebuilt-themes/' + colorname + '.css';
        }
      }
    localStorage.setItem(this.userSrv.userInfo.nickname + 'MWJS_COLOR', colorname);
  }

}
