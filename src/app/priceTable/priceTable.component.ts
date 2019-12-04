import { Component, OnInit } from '@angular/core';
import { PriceService } from '../service/priceService/price.service';

@Component({
  selector: 'app-priceTable',
  templateUrl: './priceTable.component.html',
  styleUrls: ['./priceTable.component.css']
})
export class PriceTableComponent implements OnInit {

  priceTable;

  constructor(private priceService: PriceService) { }

  ngOnInit() {
    this.priceService.getPriceTable().subscribe((data)=>{
      this.priceTable = data;
    });
  }
}