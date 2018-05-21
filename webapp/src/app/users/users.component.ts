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

    restUsers: User[];
    graphqlUsers: User[];
    viewStats: ViewStats;
    restSubscription: Subscription;
    gqlSubscription: Subscription;

    constructor(
        private srv: UsersService,
        private stats: StatsService
    ) { }

    ngOnInit() { }

    ngOnDestroy() {
        if (this.restSubscription) {
            this.restSubscription.unsubscribe();
        }
        if (this.gqlSubscription) {
            this.gqlSubscription.unsubscribe();
        }
    }

    loadUsersRest() {
        this.stats.startCollectingData('users-page', false);
        this.restSubscription = this.srv.getAllUsers().subscribe(users => {
            this.restUsers = users;
            this.stats.setData(users, false);
            this.stats.stopCollectingData('users-page', false);
        });
    }

    loadUsersGraphQL() {
        this.stats.startCollectingData('users-page', true);
        this.gqlSubscription = this.srv.graphqlGetAllUsers().subscribe(users => {
            this.graphqlUsers = users;
            this.stats.setData(users, true);
            this.stats.stopCollectingData('users-page', true);
        });
    }
}
