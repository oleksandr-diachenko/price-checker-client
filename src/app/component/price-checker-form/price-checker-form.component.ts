import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { PriceService } from 'app/service/price-service/price.service';
import { InputForm }    from 'app/model/input-form/input-form';
import { LoaderService }    from 'app/service/loader-service/loader.service';

@Component({
    selector: 'app-price-checker-form',
    templateUrl: './price-checker-form.component.html',
    styleUrls: ['./price-checker-form.component.scss']
})
export class PriceCheckerFormComponent {

    inputForm: InputForm = new InputForm(null, 1, 1);

    hideMain: boolean = false;
    hideSecond: boolean = true;

    filePicked: boolean = false;

    showSpinner: boolean = false;

    constructor(private priceService: PriceService, private loaderService: LoaderService) { }

    fileProgress(fileInput: any) {
        this.inputForm.file = <File>fileInput.target.files[0];
        this.changeFileInputLabel();
        if(this.inputForm.file != null) {
            this.filePicked = true;
        } else {
            this.filePicked = false;
        }
    }

    changeFileInputLabel() {
        var fileName = 'Choose file';
        if(this.inputForm.file != null) {
            fileName = this.inputForm.file.name;
        }
        document.getElementById('fileInputLabel').innerHTML = fileName;
    }

    checkPrice() {
        this.loaderService.show();
        this.showSpinner = true;
        const formData = new FormData();
        console.log(this.inputForm.file)
        formData.append('file', this.inputForm.file);
        this.priceService.getPriceTable(formData, this.inputForm.urlColumn, this.inputForm.insertColumn)
            .subscribe((data) => {
                var b: any = new Blob([data], { type: 'application/binary' });
                console.log(b)
                b.lastModifiedDate = new Date();
                b.name = this.getCurrentFileName(this.inputForm.file.name);
                this.inputForm.file = <File>b;
                this.showSpinner = false;
                this.hideMain = true;
                this.hideSecond = false;
                this.loaderService.hide();
            });
    }

    getCurrentFileName(fileName: string) {
        return new Date().valueOf() + '_' + this.inputForm.file.name;
    }

   download() {
       saveAs(this.inputForm.file, this.getCurrentFileName(this.inputForm.file.name))
   }
}
