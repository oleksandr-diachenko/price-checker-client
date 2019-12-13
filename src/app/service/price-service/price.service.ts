import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PriceService {

    constructor(private httpClient: HttpClient) { }

    public getPriceTable(formData: FormData, urlColumn: number, insertColumn: number) {
        return this.httpClient.post('/api/price-table/' + urlColumn + '/' + insertColumn,
                formData,
                {responseType: 'arraybuffer'}
            ).pipe(retry(10));
    }

    public pingApi() {
        this.httpClient.get('/actuator')
            .pipe(retry(10));
    }
}
