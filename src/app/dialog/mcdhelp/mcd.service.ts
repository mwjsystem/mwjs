import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Mcd {
  mcode:string;
  sei:string;
  mei:string;
  kana:string;
  mail:string;
  mail2:string;
  mail3:string;
  mail4:string;
  mail5:string;
  tcode1:string;
  tcode2:string;
  eda:number;
  zip:string;
  region:string;
  local:string;
  street:string;
  extend:string;
  extend2:string;
  adrname:string;
  tel:string;
  fax:string;
  tel2:string; 
  tel3:string; 
}


@Injectable({
  providedIn: 'root'
})
export class McdService {
  public mcds: Mcd[]=[];
  public selro: Mcd;
  public filtx: string;
  public subject = new Subject<Mcd[]>();
  public observe = this.subject.asObservable();
  constructor() { }
}
