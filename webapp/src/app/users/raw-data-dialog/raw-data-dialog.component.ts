import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-raw-data-dialog',
    templateUrl: './raw-data-dialog.component.html',
    styleUrls: ['./raw-data-dialog.component.css']
})
export class RawDataDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<RawDataDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() { }
}
