import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { split } from 'apollo-link';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { RequestInterceptor } from './request-interceptor';
import { UsersModule } from './users/users.module';
import { RawDataDialogComponent } from './raw-data-dialog/raw-data-dialog.component';
import { environment } from '../environments/environment';
import { OperationDefinitionNode } from 'graphql';

@NgModule({
    declarations: [AppComponent, RawDataDialogComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
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
        // Create an http link:
        const http = httpLink.create({
            uri: environment.graphqlBaseUrl
        });

        // Create a WebSocket link:
        const ws = new WebSocketLink({
            uri: environment.graphqlWSBaseUrl,
            options: {
                reconnect: true
            }
        });

        // using the ability to split links, you can send data to each link
        // depending on what kind of operation is being sent
        const link = split(
            // split based on operation type
            ({ query }) => {
                const { kind, operation } = <OperationDefinitionNode>getMainDefinition(query);
                return (
                    kind === 'OperationDefinition' &&
                    operation === 'subscription'
                );
            },
            ws,
            http
        );

        apollo.create({
            link,
            cache: new InMemoryCache()
        });
    }
}
