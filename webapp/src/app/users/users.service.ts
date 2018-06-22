import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import { Observable, pipe, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User, Comment } from '../models';

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
        const qryUser = gql`
            query getUser($id: ID!){
                user(id: $id) {
                    id
                    name
                    email
                    posts {
                        id
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
            .watchQuery({
                query: qryUser,
                variables: { id: userId }
            })
            .valueChanges.pipe(map(res => res.data['user']));
    }

    addComment(postId: number, newComment: string) {
        const addNewComment = gql`
            mutation addNewComment($postId: ID!, $name: String!){
                createComment(postId: $postId, name: $name) {
                    name
                }
            }
        `;

        return this.apollo.mutate({
                mutation: addNewComment,
                variables: { postId: postId, name: newComment }
            })
            .pipe(map(res => {
                return res.data['createComment'];
            }));
    }
}
