import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FileStatus} from '../model/fileStatus';

@Injectable({
    providedIn: 'root'
})
export class PriceService {

    constructor(private httpClient: HttpClient) {
    }

    public processFile(formData: FormData, urlColumn: number, insertColumn: number, userId) {
        return this.httpClient.post('/api/pricecheck?urlIndex=' + urlColumn + '&insertIndex=' + insertColumn + '&userId=' + userId,
            formData);
    }

    public getFileById(id: number) {
        return this.httpClient.get('/api/pricecheck/files/' + id, {responseType: 'arraybuffer'});
    }

    public getFileStatuses(userId: number) {
        return this.httpClient.get<FileStatus[]>('/api/pricecheck/filestatuses/' + userId);
    }
}
