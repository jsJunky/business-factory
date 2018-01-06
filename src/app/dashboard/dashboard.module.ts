import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DateComponent } from './components/filters/date/date.component';
import { SearchComponent } from './components/filters/search/search.component';
import { RecordService } from './services/record.service';
import { MomentDatePipe } from '../pipes/moment-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [DashboardComponent, DateComponent, SearchComponent, MomentDatePipe],
  exports: [DashboardComponent],
  providers: [RecordService]
})
export class DashboardModule { }
