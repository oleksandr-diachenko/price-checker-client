import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormComponent} from './component/form/form.component';
import {PriceService} from './service/price-service/price.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoaderComponent} from './component/loader/loader.component';
import {LoaderService} from './service/loader-service/loader.service';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {SuccessComponent} from './component/success/success.component';
import {ErrorComponent} from './component/error/error.component';
import {StatusComponent} from './component/status/status.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule
} from '@angular/material';


@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        LoaderComponent,
        HeaderComponent,
        FooterComponent,
        SuccessComponent,
        ErrorComponent,
        StatusComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule
    ],
    providers: [
        LoaderService,
        PriceService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
