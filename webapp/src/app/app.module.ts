import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';
import { ApolloModule } from 'apollo-angular';
import { HttpLinkModule } from 'apollo-angular-link-http';

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
        HttpLinkModule,
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
export class AppModule {}
