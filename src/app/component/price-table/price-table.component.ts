import { Component, OnInit } from '@angular/core';
import { PriceService } from 'app/service/price-service/price.service';

@Component({
    selector: 'app-price-table',
    templateUrl: './price-table.component.html',
    styleUrls: ['./price-table.component.css']
})
export class PriceTableComponent implements OnInit {

    priceTable;

    constructor(private priceService: PriceService) { }

    ngOnInit() {
    }
}