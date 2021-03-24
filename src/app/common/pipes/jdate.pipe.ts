import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'jdate'
})
export class JdatePipe implements PipeTransform {

  transform(date: number): string {
    moment.locale('ja');
    return date ? moment(date).format('(ddd)') : '  ';
  }

}
