import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PriceService } from 'app/service/price-service/price.service';
import { InputForm } from 'app/model/input-form/input-form';
import { LoaderService } from 'app/service/loader-service/loader.service';

@Component({
    selector: 'app-price-checker-form',
    templateUrl: './price-checker-form.component.html',
    styleUrls: ['./price-checker-form.component.scss']
})
export class PriceCheckerFormComponent implements OnInit {

    inputForm: InputForm = new InputForm(null, 1, 1);

    checked: boolean = false;

    isError: boolean = false;

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
        this.priceService.getPriceTable(formData, this.inputForm.urlColumn, this.inputForm.insertColumn)
            .subscribe(data => {
                var b: any = new Blob([data], { type: 'application/binary' });
                b.lastModifiedDate = new Date();
                b.name = this.getCurrentFileName(this.inputForm.file.name);
                this.inputForm.file = <File>b;
                this.checked = true;
                this.loaderService.hide();
            },
            error => {
                this.loaderService.hide();
                this.isError = true;
            });
    }

    getCurrentFileName(fileName: string) {
        return new Date().valueOf() + '_' + fileName;
    }

    receiveChecked($event) {
        this.checked = $event
    }
}
