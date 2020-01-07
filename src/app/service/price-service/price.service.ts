import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {retry} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PriceService {

    constructor(private httpClient: HttpClient) {
    }

    public startPriceChecking(formData: FormData, urlColumn: number, insertColumn: number) {
        return this.httpClient.post('/api/pricecheck?urlIndex=' + urlColumn + '&insertIndex=' + insertColumn,
            formData);
    }

    public getPriceTable() {
        return this.httpClient.get('/api/price-check/content', {responseType: 'arraybuffer'});
    }

    public getTable(id: number) {
        return this.httpClient.get('/api/price-check/file/' + id, {responseType: 'arraybuffer'});
    }

    public getFileStatuses() {
        return this.httpClient.get('/api/pricecheck/filestatuses/');
    }

    public pingApi() {
        this.httpClient.get('/actuator')
            .pipe(retry(10));
    }
}
