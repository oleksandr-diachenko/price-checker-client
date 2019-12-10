import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceTableComponent } from './component/price-table/price-table.component';


const routes: Routes = [{path:'price-table', component: PriceTableComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
