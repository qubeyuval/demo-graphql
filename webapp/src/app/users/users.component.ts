import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { RawDataDialogComponent } from './raw-data-dialog/raw-data-dialog.component';
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
        </mat-nav-list>
        <button mat-raised-button (click)="showRawData()">Show Data</button>
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
    usersJson = '';

    constructor(
        private srv: UsersService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.users$ = this.srv.getAllUsers();

        this.users$.subscribe(users => {
            this.usersJson = JSON.stringify(users);
            console.log(this.usersJson);
        });
    }

    showRawData() {
        const dialogRef = this.dialog.open(RawDataDialogComponent, {
            width: '75vw',
            height: '75vh',
            data: {
                rawData: this.usersJson
            }
        });
    }
}
