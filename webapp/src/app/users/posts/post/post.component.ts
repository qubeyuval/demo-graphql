import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../../models';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    @Input() post: Post;
    @Output() addCommentClicked = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    addComment() {
        console.log('aaaa');

        this.addCommentClicked.emit();
    }
}
