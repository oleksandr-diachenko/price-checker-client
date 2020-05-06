import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormComponent} from './component/form/form.component';
import {PriceService} from './service/price-service/price.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './component/loader/loader.component';
import {LoaderService} from './service/loader-service/loader.service';
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
import {SnackBarService} from './service/snack-bar/snack-bar.service';

@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        LoaderComponent,
        HeaderComponent,
        FooterComponent,
        StatusComponent
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
        MatSnackBarModule
    ],
    providers: [
        LoaderService,
        PriceService,
        SnackBarService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
