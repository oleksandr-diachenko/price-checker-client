import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormComponent} from './component/form/form.component';
import {PriceService} from './service/price.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {StatusComponent} from './component/status/status.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {SnackBarService} from './service/snack-bar.service';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {JwtInterceptor} from './auth/jwt.interceptor';
import {ErrorInterceptor} from './auth/error.interceptor';
import {AlertComponent} from './component/alert/alert.component';
import {NavbarModule} from 'angular-bootstrap-md';

@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        HeaderComponent,
        FooterComponent,
        StatusComponent,
        LoginComponent,
        RegisterComponent,
        AlertComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        AppRoutingModule,
        MatPaginatorModule,
        MatSnackBarModule,
        NavbarModule
    ],
    providers: [
        PriceService,
        SnackBarService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
