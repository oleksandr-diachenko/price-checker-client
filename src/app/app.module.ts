import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PriceTableComponent } from './component/price-table/price-table.component';
import { PriceCheckerFormComponent } from './component/price-checker-form/price-checker-form.component';
import { FormsModule }   from '@angular/forms';
import { Ng2LoadingSpinnerModule } from 'ng2-loading-spinner'

@NgModule({
  declarations: [
    AppComponent,
    PriceTableComponent,
    PriceCheckerFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    Ng2LoadingSpinnerModule.forRoot({
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
