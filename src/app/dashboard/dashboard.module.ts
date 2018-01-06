import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DateComponent } from './components/filters/date/date.component';
import { SearchComponent } from './components/filters/search/search.component';
import { RecordService } from './services/record.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent, DateComponent, SearchComponent],
  exports: [DashboardComponent],
  providers: [RecordService]
})
export class DashboardModule { }
