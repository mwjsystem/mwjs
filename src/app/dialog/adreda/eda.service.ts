import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EdaService {

  public adrs:mwI.Adrs[]=[];
  constructor() { }
}
