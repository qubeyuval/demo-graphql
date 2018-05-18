import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { AngularMaterialModule } from '../angular-material.module';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { UserComponent } from './user/user.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CommentsComponent } from './comments/comments.component';
import { ViewStatsComponent } from '../view-stats/view-stats.component';
@NgModule({
    imports: [
        BrowserModule,
        UsersRoutingModule,
        AngularMaterialModule
    ],
    exports: [],
    declarations: [
        UsersComponent,
        UserComponent,
        PostsComponent,
        PostComponent,
        CommentsComponent,
        ViewStatsComponent
    ],
    providers: [UsersService],
})
export class UsersModule { }
