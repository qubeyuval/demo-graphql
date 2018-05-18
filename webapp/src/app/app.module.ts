import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AngularMaterialModule } from './angular-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { RequestCounterInterceptor } from './request-counter-interceptor';
import { UsersModule } from './users/users.module';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        UsersModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularMaterialModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestCounterInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
