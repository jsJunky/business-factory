import { Injectable } from '@angular/core';
import { Record } from '../../models/record';
import { data } from '../../data';
import { Pipe } from '@angular/compiler/src/core';
import { RecordFilter } from '../../types/RecordFilter';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RecordService {

  private records: Record[] = [];
  private filters: RecordFilter[] = [];
  private recordsSubject: BehaviorSubject<Record[]> = new BehaviorSubject<Record[]>(this.records);

  constructor() { }

  /*
   * This should idealy be an HTTP request. Super simple caching so we don't create records on each request.
   * Though for this app we will just be calling this at the start.
  */
  public fetchRecords(): BehaviorSubject<Record[]> {
    if (!this.records.length) {
      this.records = data.map(record => new Record(record));
    }
    this.recordsSubject.next(this.records);
    return this.recordsSubject;
  }

  public updateRecord(newRecord: Record, oldRecord: Record): void {
    const index = this.records.findIndex(r => r === oldRecord);
    newRecord.updated = true;
    this.records = this.records.map((record: Record) => {
      record.updated = false;
      return record;
    });
    this.records = [
      ...this.records.slice(0, index),
      newRecord,
      ...this.records.slice(index + 1)
    ];
    this.recordsSubject.next(this.filterRecordsByFilters(this.filters, this.records));
  }

  public filterRecords(newFilter: RecordFilter): void {
    if (this.containsFilter(this.filters, newFilter)) {
      this.filters = [...this.removeFilter(this.filters, newFilter), newFilter];
    } else {
      this.filters = [...this.filters, newFilter];
    }

    this.recordsSubject.next(this.filterRecordsByFilters(this.filters, this.records));
  }

  public getProjectOwners(): string[] {
    const owners: string[] = this.records.map(({project_owner}) => project_owner);
    return Array.from(new Set(owners));
  }

  public getStatusTypes(): string[] {
    const statuses: string[] = this.records.map(({status}) => status);
    return Array.from(new Set(statuses));
  }

  private filterRecordsByFilters(filters: RecordFilter[], records: Record[]) {
    let filteredRecords: Record[] = [...this.records];
    filters.forEach((filter: RecordFilter) => {
      filteredRecords = filteredRecords.filter(filter.func);
    });
    return filteredRecords;
  }

  private containsFilter(filters: RecordFilter[], filter: RecordFilter): boolean {
    return filters.some((f: RecordFilter) => f.type === filter.type);
  }

  private removeFilter(filters: RecordFilter[], filter: RecordFilter): RecordFilter[] {
    return filters.filter((f: RecordFilter) => f.type !== filter.type);
  }

}
