import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatBadgeModule,
} from '@angular/material';
import { UsersRoutingModule } from './users-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { UserComponent } from './user/user.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
    imports: [
        BrowserModule,
        UsersRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatBadgeModule
    ],
    exports: [],
    declarations: [
        UsersComponent,
        UserComponent,
        PostsComponent,
        PostComponent,
        CommentsComponent
    ],
    providers: [UsersService],
})
export class UsersModule { }
