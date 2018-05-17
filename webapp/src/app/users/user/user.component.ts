import { switchMap } from 'rxjs/operators';
import { Component, OnInit, Input } from '@angular/core';
import { User, Post } from '../../models';
import { UsersService } from '../users.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    @Input() user$: Observable<User>;
    selectedPost: Post;

    constructor(
        private srv: UsersService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.user$ = this.route.paramMap.pipe(
            switchMap((prm: ParamMap) => this.srv.getUserById(+prm.get('id')))
        );
    }

    onPostSelected(post) {
        this.srv.getCommentsForPost(post.id)
            .subscribe(comments => {
                post.comments = comments;
                this.selectedPost = post;
            });
    }
}
