import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';
import { UsersComponent } from './users.component';
import { UsersService } from './users.service';
import { UserComponent } from './user/user.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CommentsComponent } from './comments/comments.component';
import { ViewStatsComponent } from '../view-stats/view-stats.component';
import { UsersListComponent } from './users-list/users-list.component';
import { HeaderToolbarComponent } from './header-toolbar/header-toolbar.component';
@NgModule({
    imports: [
        BrowserModule,
        UsersRoutingModule,
        AngularMaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [],
    declarations: [
        UsersComponent,
        UserComponent,
        PostsComponent,
        PostComponent,
        CommentsComponent,
        ViewStatsComponent,
        UsersListComponent,
        HeaderToolbarComponent
    ],
    providers: [UsersService],
})
export class UsersModule { }
