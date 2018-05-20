import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export class ViewStats {
    name: string;
    startTime: number;
    endTime?: number;
    requests?: string[];
    data?: object;
    size?: number;
}

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    // private statsBagRest: ViewStats[] = [];
    private currentViewStatsRest: ViewStats;

    public viewStatsRest = new BehaviorSubject<ViewStats>({name: '', startTime: Date.now()});

    constructor() { }

    startCollectingDataRest(viewName: string) {
        this.currentViewStatsRest = {
            name: viewName,
            startTime: Date.now(),
            requests: []
        };
    }

    stopCollectingDataRest(viewName: string) {
        if (this.currentViewStatsRest) {
            this.currentViewStatsRest.endTime = Date.now();
            this.viewStatsRest.next({ ...this.currentViewStatsRest });
            this.currentViewStatsRest = null;
        }
    }

    setData(data: Object) {
        if (this.currentViewStatsRest) {
            this.currentViewStatsRest.data = data;
            this.currentViewStatsRest.size = this.calcSize(data);
        }
    }

    addRequest(url: string) {
        if (this.currentViewStatsRest) {
            this.currentViewStatsRest.requests.push(url);
        }
    }

    private calcSize(data: Object): number {
        return JSON.stringify(data).length;
    }
}
