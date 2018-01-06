import { Component, OnInit, OnDestroy } from '@angular/core';
import { Record } from '../models/record';
import { RecordService } from './services/record.service';
import { RecordFilter } from '../types/RecordFilter';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public records: Observable<Record[]>;
  public owners: string[] = [];
  public statusTypes: string[] = [];

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    this.records = this.recordService.fetchRecords();
  }

  public onFilterChange(filters: RecordFilter) {
    this.recordService.filterRecords(filters);
  }

}
