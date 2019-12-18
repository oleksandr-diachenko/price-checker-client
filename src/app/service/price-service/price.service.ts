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
    this.httpClient.post('/api/price-check/' + urlColumn + '/' + insertColumn,
      formData).subscribe();
  }

  public getPriceTable() {
    return this.httpClient.get('/api/price-check/content', {responseType: 'arraybuffer'});
  }

  public pingApi() {
    this.httpClient.get('/actuator')
      .pipe(retry(10));
  }
}
