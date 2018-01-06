import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DateComponent } from './components/filters/date/date.component';
import { SearchComponent } from './components/filters/search/search.component';
import { RecordService } from './services/record.service';
import { MomentDatePipe } from '../pipes/moment-date.pipe';
import { RecordTableComponent } from './components/record-table/record-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [DashboardComponent, DateComponent, SearchComponent, MomentDatePipe, RecordTableComponent],
  exports: [DashboardComponent],
  providers: [RecordService]
})
export class DashboardModule { }
