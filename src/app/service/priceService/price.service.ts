import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PriceService {

    constructor(private httpClient: HttpClient) { }

    public getPriceTable(formData: FormData) {
        return this.httpClient.post('/api/price-table/1/2',
                formData,
                {responseType: 'arraybuffer'}
            );
        }
}
