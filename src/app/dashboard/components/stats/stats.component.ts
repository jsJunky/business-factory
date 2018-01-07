import { Component, OnInit, Input, SimpleChanges, SimpleChange, ChangeDetectionStrategy } from '@angular/core';
import { Record } from '../../../models/record';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() recordsObs: Observable<Record[]>;

  public statusCounts: string[] = [];
  public projectOwnerCounts: string[] = [];
  public averageBudget: number = 0;
  public totalBudget: number = 0;

  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.recordsObs
      .takeUntil(this.unsubscribeAll)
      .subscribe((records: Record[]) => {
        this.statusCounts = this.getCountsByProperty(records, 'status');
        this.projectOwnerCounts = this.getCountsByProperty(records, 'project_owner');
        this.totalBudget = records.reduce((total: number, record: Record) => total + record.budget, 0);
        this.averageBudget = this.totalBudget / records.length;
      });
  }

  private getCountsByProperty(records: Record[], property: string): string[] {
    const counts = records.
      reduce((totalCounts, record: Record) => {
        if (totalCounts[record[property]]) {
          totalCounts[record[property]]++;
        } else {
          totalCounts[record[property]] = 1;
        }
        return totalCounts;
      }, {});

    const sortedByCount = Object.keys(counts)
      .map((key: string): {key: string, value: number} => ({key, value: counts[key]}));

    sortedByCount.sort((a, b): number => Number(a.value < b.value));

    return sortedByCount
      .map(item => `${item.key}: ${item.value}`);
  }
}
