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
    @Input() isGraphQL: boolean;

    statsInfo: ViewStats;
    subscription: Subscription;

    constructor(
        private stats: StatsService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        const viewStats$: Observable<ViewStats> = this.isGraphQL ? this.stats.viewStatsGraphQL : this.stats.viewStatsRest;

        this.subscription = viewStats$.subscribe(stats => {
            if (this.viewName === stats.name) {
                stats.size = this.calcSize(stats.data);
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

    private calcSize(data: Object): number {
        if (data) {
            return JSON.stringify(data).length;
        }
        return 0;
    }
}
