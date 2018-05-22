import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Comment} from '../../models';
@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

    @Input() comments: Comment[];
    @Input() addComment = false;
    @Output() saveComment = new EventEmitter<string>();

    newComment: string;
    frmComment: FormGroup;

    constructor(private fb: FormBuilder) {
        this.frmComment = this.fb.group({ newComment: '' });
    }

    ngOnInit() {
    }

    save() {
        this.saveComment.emit(this.frmComment.get('newComment').value);
        this.clear();
    }

    clear() {
        this.frmComment.reset();
    }

}
