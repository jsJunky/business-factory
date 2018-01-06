import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Record } from '../../../models/record';
import { RecordFilter } from '../../../types/RecordFilter';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.scss']
})
export class RecordTableComponent implements OnInit, OnDestroy {
  @Input() public recordsObs: Observable<Record[]>;
  public records: Record[] = [];
  public owners: string[] = [];
  public statusTypes: string[] = [];

  @Output() public filterChange: EventEmitter<RecordFilter> = new EventEmitter<RecordFilter>();
  @Output() public modelUpdate: EventEmitter<Record> = new EventEmitter<Record>();

  public searchHeaders: any[] = [
    {title: 'Title', property: 'title'},
    {title: 'Division', property: 'division'},
    {title: 'Project Owner', property: 'project_owner'},
    {title: 'Budget', property: 'budget'},
    {title: 'Status', property: 'status'}
  ];

  public dateHeaders: any[] = [
    {title: 'Created', property: 'created'},
    {title: 'Modified', property: 'modified'}
  ];

  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(private recordService: RecordService) {}

  ngOnInit() {
    this.recordsObs
      .takeUntil(this.unsubscribeAll)
      .subscribe((records: Record[]) => {
        this.records = records;
        this.owners = this.recordService.getProjectOwners();
        this.statusTypes = this.recordService.getStatusTypes();
      });
  }

  public isBudgetValid(budget: number): boolean {
    const budgetValues: string[] = String(budget).split('.');
    return budget
      && budgetValues.length <= 2
      && budgetValues[1].length <= 2;
  }

  public broadcastFilterChange(filter: RecordFilter) {
    this.filterChange.emit(filter);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
