import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { UserComponent } from './user/user.component';
import { PostsComponent } from './posts/posts.component';

const routes: Routes = [
    { path: 'users', component: UsersComponent },
    { path: 'users/:id', component: UserComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule { }
