import {
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    OnChanges
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Post } from '../../../models';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnChanges {
    @Input() post: Post;
    @Output() saveNewComment = new EventEmitter<string>();

    allowAddComment = false;

    constructor() {}

    ngOnChanges() {
        if (this.post) {
            this.allowAddComment = false;
        }
    }

    addComment() {
        this.allowAddComment = true;
    }

    onSaveComment(newComment) {
        console.log(newComment);
        this.allowAddComment = false;
        this.saveNewComment.emit(newComment);
    }
}
