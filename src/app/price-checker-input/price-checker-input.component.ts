import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { PriceService } from '../service/priceService/price.service';

@Component({
    selector: 'app-price-checker-input',
    templateUrl: './price-checker-input.component.html',
    styleUrls: ['./price-checker-input.component.scss']
})
export class PriceCheckerInputComponent implements OnInit {

    fileBefore: File = null;
    fileAfter: File = null;

    constructor(private http: HttpClient, private priceService: PriceService) { }

    ngOnInit() {
    }

    fileProgress(fileInput: any) {
        this.fileBefore = <File>fileInput.target.files[0];
    }

    checkPrice() {
        const formData = new FormData();
        formData.append('file', this.fileBefore);
        this.priceService.getPriceTable(formData).subscribe((data) => {
            console.log(data);
            var b: any = new Blob([data], { type: 'application/binary' });
            b.lastModifiedDate = new Date();
            b.name = 'test.xlsx';
            this.fileAfter = <File>b;
        });
    }

    download() {
        console.log(this.fileAfter);
        saveAs(this.fileAfter, 'test1.xlsx')
    }
}
