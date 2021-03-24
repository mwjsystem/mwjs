import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JyumeiService {
  public jyumei: mwI.Jyumei[]=[];
  public scds: mwI.Sval[]=[];
  public mtax: mwI.Sval[]=[];
  public taxrt: mwI.Sval[]=[];
  public subject = new Subject<mwI.Jyumei[]>();
  public observe = this.subject.asObservable();
  constructor() { }
}
