import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { User, Post } from '../../models';
import { UsersService } from '../users.service';
import { StatsService } from '../../stats.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    private prmSubscription: Subscription;
    private userSubscription: Subscription;
    private commentsSubscription: Subscription;

    user: User;
    selectedPost: Post;

    constructor(
        private srv: UsersService,
        private stats: StatsService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.prmSubscription = this.route.paramMap.subscribe(prm => {
            this.stats.startCollectingDataRest('user-posts');
            this.userSubscription = this.srv.getUserById(+prm.get('id')).subscribe(user => {
                this.user = user;

                this.stats.setData(user);
                this.stats.stopCollectingDataRest('user-posts');
            });
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
    }

    onPostSelected(post) {
        this.stats.startCollectingDataRest('post-comments');
        this.commentsSubscription = this.srv.getCommentsForPost(post.id).subscribe(comments => {
            post.comments = comments;
            this.selectedPost = post;

            this.stats.setData(comments);
            this.stats.stopCollectingDataRest('post-comments');
        });
    }
}
