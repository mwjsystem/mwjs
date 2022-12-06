import { Pipe, PipeTransform } from '@angular/core';
import { VendsService } from './../../services/vends.service';


@Pipe({
  name: 'vcdtxt'
})
export class VcdtxtPipe implements PipeTransform {
  constructor(private vensrv: VendsService) { }
  transform(value: string): string {
    return this.vensrv.getVcdtxt(value);
  }
}