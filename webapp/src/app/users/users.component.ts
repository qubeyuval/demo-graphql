import { Component, OnInit } from '@angular/core';

import { UsersService } from './users.service';
import { Observable } from 'rxjs';

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
    `,
    styles: [`
    :host {
        display: flex;
        justify-content: center;
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

    constructor(private srv: UsersService) { }

    ngOnInit() {
        this.users$ = this.srv.getAllUsers();
    }

}
