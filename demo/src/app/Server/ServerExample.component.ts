
import { Component, OnInit, Injectable } from '@angular/core';
import { Person } from './../MockData/Person.class';
import { IConfiguration, IDefaultTableState, DefaultConfiguration, IDataPipeService, ITableState } from 'ng2-power-table';
import { Http } from '@angular/http';

@Injectable()
class GithubDataPipe implements IDataPipeService {
    constructor(private http : Http) {}

    pipe(data: Array<any>, tableState: ITableState, configuration: IConfiguration): Promise<Array<any>> {
        var tableStateTyped = <IDefaultTableState>tableState;

        this.http.get('https://api.github.com/repos/hoveytech/ng2-power-table/stats/commit_activity')
            .toPromise()
            .then(response => {
                let totalItemCount = 0;
                let weeks = response.json();
                for(var week of weeks) {
                    totalItemCount += week.total;
                }
                tableStateTyped.pagination.totalItemCount = totalItemCount;
            });

        let perPage = tableStateTyped.pagination.pageSize;
        let page = Math.ceil(tableStateTyped.pagination.start / perPage) + 1; // github uses 1-indexing
        let getCommits = 'https://api.github.com/repos/hoveytech/ng2-power-table/commits';
        getCommits += `?page=${page}&per_page=${perPage}`;
        return this.http.get(getCommits)
            .toPromise()
            .then(response => { 
                return response.json();                
            });
    }
}

@Component({
    moduleId: module.id,
    selector: 'server-example',
    templateUrl: './ServerExample.component.html',
    providers: [GithubDataPipe]
})
export class ServerExampleComponent {
    public allCommits: Array<any>; // unused
    public commits: Array<any>;
    public configuration: IConfiguration;

    constructor() {
        this.allCommits = [];
        this.commits = [];
        this.configuration = DefaultConfiguration.create();
        this.configuration.pipeServiceType = GithubDataPipe;
    }
}