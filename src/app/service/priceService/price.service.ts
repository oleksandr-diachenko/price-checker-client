import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private httpClient: HttpClient) { }

  public getPriceTable(){
      return this.httpClient.get(`/api/price-table/1/2`);
    }
}
