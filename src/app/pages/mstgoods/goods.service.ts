import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {
  public goods: mwI.Goods[]=[];
  public gtnks: mwI.Gtanka[]=[];
  public subGds = new Subject<mwI.Goods[]>();
  public subTnk = new Subject<mwI.Gtanka[]>();
  public obserGds = this.subGds.asObservable();
  public obserTnk = this.subTnk.asObservable();
  constructor() { }
}
