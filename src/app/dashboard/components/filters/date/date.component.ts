import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Record } from '../../../../models/record';
import { RecordFilter } from '../../../../types/RecordFilter';
import * as moment from 'moment';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {
  @Output() public filter: EventEmitter<RecordFilter> = new EventEmitter();
  @Input() public property: string;
  public startDate: Date;
  public endDate: Date = new Date();

  public onChange(startDate, endDate): void {
    if (startDate && endDate) {
      const property = this.property;
      const recordFilter = new RecordFilter(
        property,
        (value: Record): boolean => moment(value[property]).isBetween(startDate, endDate)
      );
      this.filter.emit(recordFilter);
    }
  }

}
