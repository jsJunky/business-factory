import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../../../models/record';

@Component({
  selector: '[app-record]',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordComponent {
  @Input() public record: Record;
  @Input() public owners: string[] = [];
  @Input() public statusTypes: string[] = [];
  @Output() public update: EventEmitter<Record> = new EventEmitter<Record>();

  public isBudgetValid(budget: string): boolean {
    const budgetValues: string[] = String(budget).split('.');
    if (!budget || !parseFloat(budget)) {
      return false;
    }
    if (budgetValues.length === 1) {
      return true;
    }
    if (budgetValues.length <= 2) {
      return budgetValues[1].length <= 2;
    }
    return false;
  }

  public updateOwner(owner: string, record: Record) {
    const updatedRecord = new Record(record);
    updatedRecord.project_owner = owner;
    this.update.emit(updatedRecord);
  }

  /*
   * Couple of things to talk about with this. There is a bug in angular which
   * double fires mdModelChange events for type=number inputs. :(
   *
   * Other is because this budget is updating and continues to do so after the
   * records are populated back down here it forces a refresh on this component.
   * So you type into the budget and it unfocuses immediately. Not fun UX :(
   *
   * Current solution is to only update after all changes to the field are made.
   * Perhaps this would be better anyways as then you aren't forcing a ton of changes
   * when really as a user I would just want to see the budget after input.
   *
   * Pressing Enter works so I'm going to call this a feature at this point
   * unless QA gets on my back :D
   */
  public updateBudget(budget: Event, record: Record) {
    const updatedRecord = new Record(record);
    const target = (<HTMLInputElement>budget.target);
    updatedRecord.budget = target.value ? parseFloat(target.value) : 0;
    this.update.emit(updatedRecord);
  }

  public updateStatus(status: string, record: Record) {
    const updatedRecord = new Record(record);
    updatedRecord.status = status;
    this.update.emit(updatedRecord);
  }

}
