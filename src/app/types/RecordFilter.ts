import { Record } from '../models/record';

export type RecordFilterFunction = (value?: Record, index?: number, array?: Record[] ) => boolean;

export class RecordFilter {
    type: string;
    func: RecordFilterFunction;

    constructor(type: string, func: RecordFilterFunction) {
        this.type = type;
        this.func = func;
    }
}
