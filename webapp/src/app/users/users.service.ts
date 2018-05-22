import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import { Observable, pipe, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    baseUrl = environment.apiBaseUrl;

    constructor(private http: HttpClient, private apollo: Apollo) {}

    // REST API functions
    getAllUsers(): Observable<User[]> {
        return this.http.get<any[]>(`${this.baseUrl}/users`).pipe(
            map((users: any[]) => {
                return users.map((user, ind) => {
                    return this.getUserWithPosts({ ...user, posts: [] });
                });
            }),
            switchMap(requests => forkJoin(requests))
        );
    }

    getUserById(userId: number): Observable<User> {
        return this.http.get<any>(`${this.baseUrl}/users/${userId}`).pipe(
            switchMap((user: any) => {
                return this.getUserWithPosts({ ...user, posts: [] });
            })
        );
    }

    getUserWithPosts(user: User): Observable<User> {
        return this.http
            .get<any>(`${this.baseUrl}/users/${user.id}/posts`)
            .pipe(map(posts => ({ ...user, posts })));
    }

    getCommentsForPost(postId: number) {
        return this.http.get<any[]>(`${this.baseUrl}/posts/${postId}/comments`);
    }

    // Graphql functions
    graphqlGetAllUsers(): Observable<User[]> {
        const qryUsers = gql`
            query getUsers {
                users {
                    id
                    name
                    email
                    posts {
                        title
                    }
                }
            }
        `;

        return this.apollo
            .watchQuery<any>({
                query: qryUsers
            })
            .valueChanges.pipe(map(res => res.data['users']));
    }

    graphqlGetUserById(userId: number) {
        const qryUsers = gql`
            query getUser($id: ID!){
                user(id: $id) {
                    name
                    posts {
                    title
                    body
                    comments {
                        name
                    }
                    }
                }
            }
        `;

        return this.apollo
            .watchQuery<any>({
                query: qryUsers,
                variables: { id: userId }
            })
            .valueChanges.pipe(map(res => res.data['user']));
    }
}
