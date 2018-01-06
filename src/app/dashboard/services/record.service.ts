import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { data } from '../../data';
import { Pipe } from '@angular/compiler/src/core';

type RecordFilter = (value?: Record, index?: number, array?: Record[] ) => Record[];

@Injectable()
export class RecordService {

  private records: Record[] = [];

  constructor() { }

  /*
   * This should idealy be an HTTP request. Super simple caching so we don't create records on each request.
   * Though for this app we will just be calling this at the start.
  */
  public fetchRecords(): Record[] {
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

  public filterRecords(filters: RecordFilter[]): Record[] {
    let filteredRecords: Record[] = [...this.records];
    filters.forEach((filter: RecordFilter) => {
      filteredRecords = filteredRecords.filter(filter);
    });

    return filteredRecords;
  }

  public fetchProjectOwners(): string[] {
    const owners: string[] = this.records.map(({project_owner}) => project_owner);
    return Array.from(new Set(owners));
  }

  public fetchStatusTypes(): string[] {
    const statuses: string[] = this.records.map(({status}) => status);
    return Array.from(new Set(statuses));
  }

}
