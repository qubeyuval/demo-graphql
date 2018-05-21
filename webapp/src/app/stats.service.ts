import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';

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

    private _currentViewStatsRest: ViewStats;
    private _currentViewStatsGraphQL: ViewStats;

    private _viewStatsRest = new BehaviorSubject<ViewStats>({name: ''});
    public get viewStatsRest() {
        return this._viewStatsRest.asObservable();
    }

    private _viewStatsGraphQL = new BehaviorSubject<ViewStats>({name: ''});
    public get viewStatsGraphQL() {
        return this._viewStatsGraphQL.asObservable();
    }

    constructor() { }

    startCollectingData(viewName: string, isGraphQL: boolean) {
        const currentViewStats = {
            name: viewName,
            startTime: Date.now(),
            requests: []
        };
        isGraphQL
            ? this._currentViewStatsGraphQL = currentViewStats
            : this._currentViewStatsRest = currentViewStats;
    }

    stopCollectingData(viewName: string, isGraphQL: boolean) {
        let currentViewStats, viewStats;
        if (isGraphQL) {
            currentViewStats = this._currentViewStatsGraphQL;
            viewStats = this._viewStatsGraphQL;
        } else {
            currentViewStats = this._currentViewStatsRest;
            viewStats = this._viewStatsRest;
        }

        if (currentViewStats && currentViewStats.name === viewName) {
            currentViewStats.endTime = Date.now();
            viewStats.next({ ...currentViewStats });
            currentViewStats = null;
        }
    }

    setData(data: Object, isGraphQL: boolean) {
        const currentViewStats = isGraphQL ? this._currentViewStatsGraphQL : this._currentViewStatsRest;
        if (currentViewStats) {
            currentViewStats.data = data;
        }
    }

    addRequest(url: string) {
        if (url.startsWith(environment.graphqlBaseUrl)) {
            if (this._currentViewStatsGraphQL) {
                this._currentViewStatsGraphQL.requests.push(url);
            }
        } else {
            if (this._currentViewStatsRest) {
                this._currentViewStatsRest.requests.push(url);
            }
        }
    }



    // startCollectingDataRest(viewName: string) {
    //     this.currentViewStatsRest = {
    //         name: viewName,
    //         startTime: Date.now(),
    //         requests: []
    //     };
    // }

    // stopCollectingDataRest(viewName: string) {
    //     if (this.currentViewStatsRest && this.currentViewStatsRest.name === viewName) {
    //         this.currentViewStatsRest.endTime = Date.now();
    //         this._viewStatsRest.next({ ...this.currentViewStatsRest });
    //         this.currentViewStatsRest = null;
    //     }
    // }

    // setData(data: Object) {
    //     if (this.currentViewStatsRest) {
    //         this.currentViewStatsRest.data = data;
    //     }
    // }

    // addRequest(url: string) {
    //     if (this.currentViewStatsRest) {
    //         this.currentViewStatsRest.requests.push(url);
    //     }
    // }


}
