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
    graphqlUsers: User[];
    viewStats: ViewStats;
    subscription: Subscription;
    gqlSubscription: Subscription;

    constructor(
        private srv: UsersService,
        private stats: StatsService
    ) { }

    ngOnInit() {
        this.stats.startCollectingData('users-page', false);
        this.subscription = this.srv.getAllUsers().subscribe(users => {
            this.users = users;
            this.stats.setData(users, false);
            this.stats.stopCollectingData('users-page', false);
        });

        this.stats.startCollectingData('users-page', true);
        this.gqlSubscription = this.srv.graphqlGetAllUsers().subscribe(users => {
            this.graphqlUsers = users;
            this.stats.setData(users, true);
            this.stats.stopCollectingData('users-page', true);
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        if (this.gqlSubscription) {
            this.gqlSubscription.unsubscribe();
        }
    }
}
