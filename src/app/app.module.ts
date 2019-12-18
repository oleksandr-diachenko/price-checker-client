import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormComponent} from './component/form/form.component';
import {PriceService} from './service/price-service/price.service';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderComponent} from './component/loader/loader.component'
import {LoaderService} from './service/loader-service/loader.service';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {CompleteComponent} from './component/complete/complete.component';
import {ErrorComponent} from './component/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    CompleteComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
    LoaderService,
    PriceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
