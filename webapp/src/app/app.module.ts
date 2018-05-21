import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { RequestInterceptor } from './request-interceptor';
import { UsersModule } from './users/users.module';
import { RawDataDialogComponent } from './raw-data-dialog/raw-data-dialog.component';

@NgModule({
    declarations: [AppComponent, RawDataDialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        UsersModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularMaterialModule,
        ApolloModule,
        HttpLinkModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true
        }
    ],
    entryComponents: [RawDataDialogComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(apollo: Apollo, httpLink: HttpLink) {
        apollo.create({
            link: httpLink.create({ uri: 'http://localhost:3300/graphql' }),
            cache: new InMemoryCache()
        });
    }
}
