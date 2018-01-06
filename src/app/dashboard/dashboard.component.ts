import { Component, OnInit } from '@angular/core';
import { Record } from '../models/record';
import { RecordService } from './services/record.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public titles: string[] = ['Title', 'Division', 'Project Owner', 'Budget', 'Status', 'Created', 'Modified'];
  public records: Record[] = [];

  constructor(private recordService: RecordService) { }

  ngOnInit() {
    this.records = this.recordService.fetchRecords();
  }

}
