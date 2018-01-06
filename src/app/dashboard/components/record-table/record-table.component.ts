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

  ngOnInit(): void {
    this.recordsObs
      .takeUntil(this.unsubscribeAll)
      .subscribe((records: Record[]) => {
        this.records = records;
        this.owners = this.recordService.getProjectOwners();
        this.statusTypes = this.recordService.getStatusTypes();
      });
  }

  public broadcastFilterChange(filter: RecordFilter): void {
    this.recordService.filterRecords(filter);
  }

  public broadcastRecordChanges(record: Record, oldRecord: Record): void {
    this.recordService.updateRecord(record, oldRecord);
  }


  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
