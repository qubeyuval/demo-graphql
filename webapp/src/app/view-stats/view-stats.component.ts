import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StatsService, ViewStats } from './../stats.service';
import { RawDataDialogComponent } from '../raw-data-dialog/raw-data-dialog.component';


@Component({
    selector: 'app-view-stats',
    templateUrl: './view-stats.component.html',
    styleUrls: ['./view-stats.component.css']
})
export class ViewStatsComponent implements OnInit {

    // statsInfo$: Observable<ViewStats>;
    statsInfo: ViewStats;

    constructor(
        private stats: StatsService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        // this.statsInfo$ = this.stats.viewStatsRest.asObservable();
        this.stats.viewStatsRest.subscribe(stats => {
            this.statsInfo = stats;
        });
    }

    showResponseData() {
        const dialogRef = this.dialog.open(RawDataDialogComponent, {
            width: '75vw',
            height: '75vh',
            data: {
                rawData: this.statsInfo.data
            }
        });
    }

}
