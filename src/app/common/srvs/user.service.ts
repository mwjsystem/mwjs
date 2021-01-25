import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Apollo } from 'apollo-angular';
import * as Query from './../graph-ql/queries.mst';
import { AbstractControl } from '@angular/forms';

export class TmStmp {
  created_at: Date;
  created_by: string; 
  updated_at: Date;
  updated_by: string; 
  constructor(init?:Partial<TmStmp>) {
    Object.assign(this, init);
  }   
}
export class System {
  name:string;
  subname:string;
  maxmcd:string;
  constructor(init?:Partial<System>) {
    Object.assign(this, init);
  } 
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  userInfo: {[key: string]: any} = {};
  compid:number;
  tmstmp:TmStmp=new TmStmp();
  system:System=new System();
  
  constructor(public auth: AuthService,
              private apollo: Apollo) {
    this.auth.user$.subscribe(user => {
      this.userInfo = user;
      this.compid=this.userInfo['https://userids'][0];
      this.apollo.watchQuery<any>({
        query: Query.GetMast4, 
          variables: { 
            id : this.compid
          },
        })
        .valueChanges
        .subscribe(({ data }) => {
          this.system=data.mssystem[0];
        },(error) => {
          console.log('error query get_system', error);
        });
    })
   }

  logout(): void {
    // Call this to log the user out of the application
    this.auth.logout({ returnTo: window.location.origin });
  }

  editFrmval(frm:AbstractControl,fld:string):any{
    let val:any;  
    if(frm.value[fld]==""){
      val = null;
    }else{  
      val = frm.value[fld];
    }
    return val;
  }
 
  editFtel(frm:AbstractControl,fld1:string,fld2:string,fld3:string,fld4:string):any{
    let val:any=''; 
    if(frm.value[fld1]){
      val += frm.value[fld1].replace(/[^0-9]/g,'');
    }
    if(frm.value[fld2]){
      val += frm.value[fld2].replace(/[^0-9]/g,'');
    }
    if(frm.value[fld3]){
      val += frm.value[fld3].replace(/[^0-9]/g,'');
    }
    if(frm.value[fld4]){
      val += frm.value[fld4].replace(/[^0-9]/g,'');
    }
    return val;
  }  
  
  setTmstmp(obj:any):void {
    this.tmstmp.created_at = obj.created_at;
    this.tmstmp.created_by = obj.created_by;
    this.tmstmp.updated_at = obj.updated_at;
    this.tmstmp.updated_by = obj.updated_by;
  }
}
