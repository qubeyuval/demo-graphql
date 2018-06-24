import { Component } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    restApiUrl = environment.apiBaseUrl;
    graphQLUrl = environment.graphqlPlaygroundUrl;

    constructor(overlayContainer: OverlayContainer) {
        overlayContainer.getContainerElement()
                        .classList.add('mat-light-theme');
    }
}
