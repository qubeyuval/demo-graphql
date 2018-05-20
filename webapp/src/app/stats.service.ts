import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export class ViewStats {
    name: string;
    startTime?: number;
    endTime?: number;
    requests?: string[];
    data?: object;
    size?: number;
}

@Injectable({
    providedIn: 'root'
})
export class StatsService {

    private currentViewStatsRest: ViewStats;

    private _viewStatsRest = new BehaviorSubject<ViewStats>({name: ''});
    public get viewStatsRest() {
        return this._viewStatsRest.asObservable();
    }

    constructor() { }

    startCollectingDataRest(viewName: string) {
        this.currentViewStatsRest = {
            name: viewName,
            startTime: Date.now(),
            requests: []
        };
    }

    stopCollectingDataRest(viewName: string) {
        if (this.currentViewStatsRest && this.currentViewStatsRest.name === viewName) {
            this.currentViewStatsRest.endTime = Date.now();
            this._viewStatsRest.next({ ...this.currentViewStatsRest });
            this.currentViewStatsRest = null;
        }
    }

    setData(data: Object) {
        if (this.currentViewStatsRest) {
            this.currentViewStatsRest.data = data;
        }
    }

    addRequest(url: string) {
        if (this.currentViewStatsRest) {
            this.currentViewStatsRest.requests.push(url);
        }
    }


}
