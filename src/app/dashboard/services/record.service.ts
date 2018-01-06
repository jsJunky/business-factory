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
    this.recordsSubject.next(this.records);
    return this.recordsSubject;
  }

  public filterRecords(newFilter: RecordFilter): void {
    let filteredRecords: Record[] = [...this.records];

    if (this.containsFilter(this.filters, newFilter)) {
      this.filters = [...this.removeFilter(this.filters, newFilter), newFilter];
    } else {
      this.filters = [...this.filters, newFilter];
    }

    this.filters.forEach((filter: RecordFilter) => {
      filteredRecords = filteredRecords.filter(filter.func);
    });

    this.recordsSubject.next(filteredRecords);
  }

  public fetchProjectOwners(): string[] {
    const owners: string[] = this.records.map(({project_owner}) => project_owner);
    return Array.from(new Set(owners));
  }

  public fetchStatusTypes(): string[] {
    const statuses: string[] = this.records.map(({status}) => status);
    return Array.from(new Set(statuses));
  }

  private containsFilter(filters: RecordFilter[], filter: RecordFilter): boolean {
    return filters.some((f: RecordFilter) => f.type === filter.type);
  }

  private removeFilter(filters: RecordFilter[], filter: RecordFilter): RecordFilter[] {
    return filters.filter((f: RecordFilter) => f.type !== filter.type);
  }

}
