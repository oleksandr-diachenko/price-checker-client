import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { PriceService } from 'app/service/price-service/price.service';

@Component({
    selector: 'app-price-checker-form',
    templateUrl: './price-checker-form.component.html',
    styleUrls: ['./price-checker-form.component.scss']
})
export class PriceCheckerFormComponent implements OnInit {

    fileBefore: File;
    fileAfter: File;
    isDownloadDisable: boolean = true;

    constructor(private http: HttpClient, private priceService: PriceService) { }

    ngOnInit() {
    }

    fileProgress(fileInput: any) {
        this.fileBefore = <File>fileInput.target.files[0];
    }

    checkPrice() {
        const formData = new FormData();
        formData.append('file', this.fileBefore);
        this.isDownloadDisable = true;
        this.priceService.getPriceTable(formData).subscribe((data) => {
            var b: any = new Blob([data], { type: 'application/binary' });
            b.lastModifiedDate = new Date();
            b.name = this.fileBefore.name;
            this.fileAfter = <File>b;
            this.isDownloadDisable = false;
        });
    }

    download() {
        saveAs(this.fileAfter, new Date().valueOf() + '_' + this.fileBefore.name)
    }
}