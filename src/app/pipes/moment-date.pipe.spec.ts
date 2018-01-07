import { MomentDatePipe } from './moment-date.pipe';
import * as moment from 'moment';

describe('MomentDatePipe', () => {
  it('should create an instance', () => {
    const pipe = new MomentDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform a moment property into calendar', () => {
    const pipe = new  MomentDatePipe();
    const expected = '10/22/2015';
    const actual = pipe.transform(moment('10/22/2015'));
    expect(actual).toEqual(expected);
  });

  it('should return `N/A` when undefined value provided', () => {
    const pipe = new  MomentDatePipe();
    const expected = '10/22/2015';
    const actual = pipe.transform(undefined);
    expect(actual).toEqual('N/A');
  });

  it('should return `N/A` for invalid dates', () => {
    const pipe = new  MomentDatePipe();
    const actual = pipe.transform(moment('invalid date'));
    expect(actual).toEqual('N/A');
  });
});
