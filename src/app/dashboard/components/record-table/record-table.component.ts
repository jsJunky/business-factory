import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../../../models/record';
import { RecordFilter } from '../../../types/RecordFilter';

@Component({
  selector: 'app-record-table',
  templateUrl: './record-table.component.html',
  styleUrls: ['./record-table.component.scss']
})
export class RecordTableComponent {
  @Input() public records: Record[] = [];
  @Input() public owners: string[] = [];
  @Input() public statusTypes: string[] = [];

  @Output() public filterChange: EventEmitter<RecordFilter> = new EventEmitter<RecordFilter>();

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

  public isBudgetValid(budget: number): boolean {
    const budgetValues: string[] = String(budget).split('.');
    return budget
      && budgetValues.length <= 2
      && budgetValues[1].length <= 2;
  }

  public broadcastFilterChange(filter: RecordFilter) {
    this.filterChange.emit(filter);
  }

}
