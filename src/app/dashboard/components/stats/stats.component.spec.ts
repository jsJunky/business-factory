import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { Record } from '../../../models/record';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
  });

  describe('Scenario: Component created', () => {
    let expectedRecords;

    beforeEach(() => {
      expectedRecords = [
        new Record({
          'title': 'Quaxo',
          'division': 'Administration',
          'project_owner': 'Nicole Smith',
          'budget': 13945.69,
          'status': 'archived',
          'created': '07/13/2015',
          'modified': '09/21/2015'
        }),
        new Record({
          'title': 'Trunyx',
          'division': 'Production',
          'project_owner': 'Nicole Smith',
          'budget': 23136.21,
          'status': 'delivered',
          'created': '09/03/2015',
          'modified': '09/19/2015'
        })
      ];
      component.recordsObs = Observable.of(expectedRecords);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set status counts', () => {
      expect(component.statusCounts).toEqual(['archived: 1', 'delivered: 1']);
    });

    it('should set project owner counts', () => {
      expect(component.projectOwnerCounts).toEqual(['Nicole Smith: 2']);
    });

    it('should set total budget', () => {
      const expectedTotal = expectedRecords[0].budget + expectedRecords[1].budget;
      expect(component.totalBudget).toEqual(expectedTotal);
    });

    it('should set average budget', () => {
      const expectedAverage = (expectedRecords[0].budget + expectedRecords[1].budget) / 2;
      expect(component.averageBudget).toEqual(expectedAverage);
    });
  });
});
