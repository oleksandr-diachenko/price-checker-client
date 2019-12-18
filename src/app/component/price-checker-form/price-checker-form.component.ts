import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { PriceService } from 'app/service/price-service/price.service';
import { InputForm } from 'app/model/input-form/input-form';
import { LoaderService } from 'app/service/loader-service/loader.service';
import { interval, Subscription} from 'rxjs';
import { takeWhile, timeout } from 'rxjs/operators';

@Component({
    selector: 'app-price-checker-form',
    templateUrl: './price-checker-form.component.html',
    styleUrls: ['./price-checker-form.component.scss']
})
export class PriceCheckerFormComponent implements OnInit {

    inputForm: InputForm = new InputForm(null, 1, 1);

    intervalSubscription: Subscription;

    checked: boolean = false;

    error: string;

    constructor(private priceService: PriceService, private loaderService: LoaderService) { }

    ngOnInit() {
        this.priceService.pingApi(); //workaround to start api on heroku
    }

    fileProgress(fileInput: any) {
        this.inputForm.file = <File>fileInput.target.files[0];
        this.changeFileInputLabel();
    }

    changeFileInputLabel() {
        document.getElementById('fileInputLabel').innerHTML = this.inputForm.file
                                                              ? this.inputForm.file.name
                                                              : 'Choose file';
    }

    checkPrice() {
        this.loaderService.show();
        const formData = new FormData();
        formData.append('file', this.inputForm.file);
        this.priceService.startPriceChecking(formData, this.inputForm.urlColumn, this.inputForm.insertColumn);
        this.intervalSubscription = interval(10000).subscribe((x => {
            this.priceService.getPriceTable()
                             .pipe(timeout(10000))
                             .subscribe(data => {
                                            if(data.byteLength) {
                                                this.intervalSubscription.unsubscribe();
                                                this.handleResponse(data);
                                            }
                                        },
                                        error => {
                                            this.intervalSubscription.unsubscribe();
                                            this.handleError(error);
                                        });
                                        }));
    }

    handleResponse(data: ArrayBuffer) {
        var b: any = new Blob([data], { type: 'application/binary' });
        b.lastModifiedDate = new Date();
        b.name = this.getCurrentFileName(this.inputForm.file.name);
        this.inputForm.file = <File>b;
        this.checked = true;
        this.loaderService.hide();
    }

    handleError(error: HttpErrorResponse) {
        this.loaderService.hide();
        this.error = error.message;
    }

    getCurrentFileName(fileName: string) {
        return new Date().valueOf() + '_' + fileName;
    }

    receiveChecked($event) {
        this.checked = $event
    }
}
