import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Observable, pipe, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient) { }

    getAllUsers(): Observable<User[]> {
        return this.http.get<any[]>(`${this.baseUrl}/users`)
            .pipe(
                map((users: any[]) => {
                    return users.map((user, ind) => {
                        const {id, name, email} = user;
                        return this.getUserWithPosts({id, name, email, posts: []});
                    });
                }),
                switchMap(requests => forkJoin(requests))
            );
    }

    getUserWithPosts(user: User): Observable<User> {
        return this.http.get<any>(`${this.baseUrl}/users/${user.id}/posts`)
                    .pipe(map(posts => ({...user, posts})));
    }
}
