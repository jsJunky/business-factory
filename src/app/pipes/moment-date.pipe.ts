import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {
  transform(value: moment.Moment): string {
    if (!value || !value.isValid()) {
      return 'N/A';
    }
    return moment(value).calendar();
  }

}
