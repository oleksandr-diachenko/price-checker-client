import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PriceService {

    constructor(private httpClient: HttpClient) {
    }

    public processFile(formData: FormData, urlColumn: number, insertColumn: number) {
        return this.httpClient.post('/api/pricecheck?urlIndex=' + urlColumn + '&insertIndex=' + insertColumn,
            formData);
    }

    public getFileById(id: number) {
        return this.httpClient.get('/api/pricecheck/file/' + id, {responseType: 'arraybuffer'});
    }

    public getFileStatuses() {
        return this.httpClient.get('/api/pricecheck/filestatuses/');
    }
}
