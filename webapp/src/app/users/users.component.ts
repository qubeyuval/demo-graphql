import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { StatsService, ViewStats } from '../stats.service';
@Component({
    selector: 'app-users',
    template: `
        <mat-nav-list>
            <h3 mat-subheader>Users</h3>
            <a mat-list-item *ngFor="let user of users$ | async" [routerLink]="[user.id]">
                <div>
                    <strong matLine>{{ user.name }}</strong>
                    <small matLine>{{ user.email }}</small>
                </div>

                <span class="spacer"></span>

                <div class="stats">
                    <strong matLine>{{ user.posts.length }}</strong>
                    <small matLine>Posts</small>
                </div>

                <mat-divider></mat-divider>
            </a>
            <app-view-stats [viewName]="'users-page'"></app-view-stats>
        </mat-nav-list>
    `,
    styles: [`
    :host {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    mat-nav-list {
        width: 75%;
    }
    .stats {
        flex: 0 1 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .spacer {
        flex: 1 1 auto;
    }`]
})
export class UsersComponent implements OnInit {

    users$: Observable<any[]>;
    viewStats: ViewStats;

    constructor(
        private srv: UsersService,
        private stats: StatsService
    ) { }

    ngOnInit() {
        this.stats.startCollectingDataRest('users-page');
        this.users$ = this.srv.getAllUsers();

        this.users$.subscribe(users => {
            this.stats.setData(users);
            this.stats.stopCollectingDataRest('users-page');
        });
    }
}
