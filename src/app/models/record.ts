import * as moment from 'moment';

export class Record {
    title: string;
    division: string;
    project_owner: string;
    budget: number;
    status: string;
    created: moment.Moment;
    modified: moment.Moment;

    constructor(
        title: string,
        division: string,
        project_owner: string,
        budget: number,
        status: string,
        created: string,
        modified: string
    ) {
        this.title = title;
        this.division = division;
        this.project_owner = project_owner;
        this.budget = budget;
        this.status = status;
        this.created = moment(created);
        this.modified = moment(modified);
    }
}
