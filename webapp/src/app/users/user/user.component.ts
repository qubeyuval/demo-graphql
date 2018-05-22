import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { User, Post } from '../../models';
import { UsersService } from '../users.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    private prmSubscription: Subscription;
    private userSubscription: Subscription;
    private commentsSubscription: Subscription;
    private addCommentSubscription: Subscription;

    user: User;
    selectedPost: Post;

    constructor(
        private srv: UsersService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.prmSubscription = this.route.paramMap.subscribe(prm => {
            this.userSubscription = this.srv.graphqlGetUserById(+prm.get('id')).subscribe(user => {
                this.user = user;
            });

            // REST API
            // this.userSubscription = this.srv.getUserById(+prm.get('id')).subscribe(user => {
            //     this.user = user;
            // });
        });
    }

    ngOnDestroy() {
        if (this.prmSubscription) {
            this.prmSubscription.unsubscribe();
        }
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
        if (this.commentsSubscription) {
            this.commentsSubscription.unsubscribe();
        }
        if (this.addCommentSubscription) {
            this.addCommentSubscription.unsubscribe();
        }
    }

    onPostSelected(post) {
        // GraphQL - post object already contains comments list - no need to do a special fetch for comments
        this.selectedPost = post;

        // REST API
        // this.commentsSubscription = this.srv.getCommentsForPost(post.id).subscribe(comments => {
        //     post.comments = comments;
        //     this.selectedPost = post;
        // });
    }

    onSaveNewComment(newComment) {
        const post = this.selectedPost;
        this.addCommentSubscription = this.srv.addComment(post.id, newComment)
            .subscribe(comment => {
                this.selectedPost = { ...post, comments: [...post.comments, comment]};
            });
    }
}
