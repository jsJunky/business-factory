import * as moment from 'moment';

interface RecordData {
    title: string;
    division: string;
    project_owner: string;
    budget: number;
    status: string;
    created: string;
    modified: string;
}

export class Record {
    title: string;
    division: string;
    project_owner: string;
    budget: number;
    status: string;
    created: moment.Moment;
    modified: moment.Moment;
    updated?: boolean = false;

    constructor(
        record: RecordData | Record
    ) {
        this.title = record.title;
        this.division = record.division;
        this.project_owner = record.project_owner;
        this.budget = record.budget;
        this.status = record.status;
        this.created = moment(record.created);
        this.modified = moment(record.modified);
    }
}
