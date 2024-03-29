import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class VendsService {

  vends: mwI.Vendor[] = [];

  constructor(private usrsrv: UserService,
    private apollo: Apollo) { }

  getVendors(): Promise<Boolean> {
    const GetMast = gql`
    query get_vendors($id: smallint!) {
      msvendor(where: {id: {_eq: $id}}, order_by: {code: asc}) {
        code
        adrname
        kana
        mtax
        currency
        tel
        tel2
        tel3
        fax
        mail1
        mail2
        mail3
        mail4
        mail5
        tanto
        url
        del
        ftel
        zip
        region
        local
      }
    }`;
    return new Promise<Boolean>(resolve => {
      this.apollo.watchQuery<any>({
        query: GetMast,
        variables: {
          id: this.usrsrv.compid
        },
      })
        .valueChanges
        .subscribe(({ data }) => {
          this.vends = data.msvendor;
          resolve(true);
        }, (error) => {
          console.log('error query get_vendors', error);
        });
    });
  }

  getVcdtxt(vcd: string): string {
    const i: number = this.vends.findIndex(obj => obj.code == vcd);
    let vcdtxt: string = "";
    if (i > -1) {
      vcdtxt = this.vends[i].adrname;
    } else {
      vcdtxt = "";
    }
    return vcdtxt;
  }
  getVendor(vcd: string): any {
    let vendor = {};
    const i: number = this.vends.findIndex(obj => obj.code == vcd);
    if (i > -1) {
      vendor['name'] = this.vends[i].adrname;
      vendor['mtax'] = this.vends[i].mtax;
      vendor['currency'] = this.vends[i].currency;
      vendor['tel'] = this.vends[i].tel;
      vendor['fax'] = this.vends[i].fax;
    } else {
      vendor['name'] = "";
      vendor['mtax'] = "";
      vendor['currency'] = "";
      vendor['tel'] = "";
      vendor['fax'] = "";
    }
    return vendor;
  }

}
