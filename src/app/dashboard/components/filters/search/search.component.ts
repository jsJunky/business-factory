import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Record } from '../../../../models/record';
import { RecordFilter } from '../../../../types/RecordFilter';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Output() public filter: EventEmitter<RecordFilter> = new EventEmitter();
  @Input() public property: string;
  public searchValue: string;

  public onChange(filterText: string): void {
    const property = this.property;
    const recordFilter = new RecordFilter(
      property,
      (value: Record): boolean => String(value[property])
                                    .toLowerCase()
                                    .includes(filterText.toLowerCase())
    );
    this.filter.emit(recordFilter);
  }
}
