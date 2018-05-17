import { Component, OnInit } from '@angular/core';

import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

    users$: Observable<any[]>;

    constructor(private srv: UsersService) { }

    ngOnInit() {
        this.users$ = this.srv.getAllUsers();
    }

}
