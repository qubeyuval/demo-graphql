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

    // REST API functions
    getAllUsers(): Observable<User[]> {
        return this.http.get<any[]>(`${this.baseUrl}/users`)
            .pipe(
                map((users: any[]) => {
                    return users.map((user, ind) => {
                        return this.getUserWithPosts({ ...user, posts: [] });
                    });
                }),
                switchMap(requests => forkJoin(requests))
            );
    }

    getUserById(userId: number): Observable<User> {
        return this.http.get<any>(`${this.baseUrl}/users/${userId}`)
            .pipe(
                switchMap((user: any) => {
                    return this.getUserWithPosts({ ...user, posts: [] });
                })
            );
    }

    getUserWithPosts(user: User): Observable<User> {
        return this.http.get<any>(`${this.baseUrl}/users/${user.id}/posts`)
            .pipe(map(posts => ({ ...user, posts })));
    }

    getCommentsForPost(postId: number) {
        return this.http.get<any[]>(`${this.baseUrl}/posts/${postId}/comments`);
    }


    // Graphql functions

}
