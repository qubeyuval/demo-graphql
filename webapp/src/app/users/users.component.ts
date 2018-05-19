import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { UsersService } from './users.service';
import { StatsService, ViewStats } from '../stats.service';
import { User } from '../models';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-users',
    template: `
        <mat-nav-list>
            <h3 mat-subheader>Users</h3>
            <a mat-list-item *ngFor="let user of users" [routerLink]="[user.id]">
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
    }`]
})
export class UsersComponent implements OnInit, OnDestroy {

    users: User[];
    viewStats: ViewStats;
    subscription: Subscription;

    constructor(
        private srv: UsersService,
        private stats: StatsService
    ) { }

    ngOnInit() {
        this.stats.startCollectingDataRest('users-page');

        this.subscription = this.srv.getAllUsers().subscribe(users => {
            this.users = users;
            this.stats.setData(users);
            this.stats.stopCollectingDataRest('users-page');
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
