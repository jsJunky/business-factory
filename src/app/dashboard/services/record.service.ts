import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { data } from '../../data';
import { Pipe } from '@angular/compiler/src/core';

type RecordFilter = (value?: Record, index?: number, array?: Record[] ) => Record[];

@Injectable()
export class RecordService {

  private records: Record[] = [];
  private filteredRecords: Record[];

  constructor() { }

  /*
   * This should idealy be an HTTP request. Super simple caching so we don't create records on each request.
   * Though for this app we will just be calling this at the start.
  */
  fetchRecords(): Record[] {
    if (!this.records.length) {
      this.records = data.map(record => new Record(
        record.title,
        record.division,
        record.project_owner,
        record.budget,
        record.status,
        record.created,
        record.modified
      ));
    }

    return this.records;
  }

  filterRecords(filters: RecordFilter[]): Record[] {
    this.filteredRecords = [...this.records];
    filters.forEach((filter: RecordFilter) => {
      this.filteredRecords = this.filteredRecords.filter(filter);
    });
    return this.filteredRecords;
  }
}
