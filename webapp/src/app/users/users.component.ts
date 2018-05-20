import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { UsersService } from './users.service';
import { StatsService, ViewStats } from '../stats.service';
import { User } from '../models';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.css']
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
