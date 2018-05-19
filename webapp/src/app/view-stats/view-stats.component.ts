import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';

import { StatsService, ViewStats } from './../stats.service';
import { RawDataDialogComponent } from '../raw-data-dialog/raw-data-dialog.component';


@Component({
    selector: 'app-view-stats',
    templateUrl: './view-stats.component.html',
    styleUrls: ['./view-stats.component.css']
})
export class ViewStatsComponent implements OnInit, OnDestroy {

    @Input() viewName: string;

    statsInfo: ViewStats;
    subscription: Subscription;

    constructor(
        private stats: StatsService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.subscription = this.stats.viewStatsRest.subscribe(stats => {
            if (this.viewName === stats.name) {
                this.statsInfo = stats;
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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
