import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-priceTable',
  templateUrl: './priceTable.component.html',
  styleUrls: ['./priceTable.component.css']
})
export class PriceTableComponent implements OnInit {

  priceTable;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getNews().subscribe((data)=>{
      this.priceTable = data;
    });
  }
}
