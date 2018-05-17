import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../models';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

    @Input() posts: Post[];
    @Output() selectionChanged = new EventEmitter<Post>();

    constructor() { }

    ngOnInit() {
    }

    selectPost(post: Post) {
        this.selectionChanged.emit(post);
    }
}
