import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceTableComponent } from './priceTable/priceTable.component';


const routes: Routes = [{path:'priceTable', component: PriceTableComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
