import { Component, OnInit, OnDestroy } from '@angular/core';
import { Record } from '../models/record';
import { RecordService } from './services/record.service';
import { RecordFilter } from '../types/RecordFilter';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public records: Record[] = [];
  public owners: string[] = [];
  public statusTypes: string[] = [];
  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    this.recordService.fetchRecords()
      .takeUntil(this.unsubscribeAll)
      .subscribe((records: Record[]) => {
        this.records = records;
      });
    this.owners = this.recordService.fetchProjectOwners();
    this.statusTypes = this.recordService.fetchStatusTypes();
  }

  public isBudgetValid(budget: number): boolean {
    const budgetValues: string[] = String(budget).split('.');
    return budget
      && budgetValues.length <= 2
      && budgetValues[1].length <= 2;
  }

  public broadcastFilterChange(filters: RecordFilter) {
    this.recordService.filterRecords(filters);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
