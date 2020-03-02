import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PriceService} from 'app/service/price-service/price.service';
import {InputForm} from 'app/model/input-form/input-form';
import {LoaderService} from 'app/service/loader-service/loader.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {

    public inputForm = new InputForm(null, 1, 1);
    public isStatusesView = false;
    public errorMessage: string;
    public successMessage: string;

    constructor(private priceService: PriceService, private loaderService: LoaderService) {
    }

    public fileProgress(fileInput: any): void {
        this.inputForm.file = fileInput.target.files[0] as File;
        this.changeFileInputLabel();
    }

    private changeFileInputLabel(): void {
        document.getElementById('fileInputLabel').innerHTML = this.inputForm.file
            ? this.inputForm.file.name
            : 'Choose file';
    }

    public checkPrice(): void {
        this.loaderService.show();
        const formData = new FormData();
        formData.append('file', this.inputForm.file);
        this.priceService.processFile(formData, this.inputForm.urlColumn, this.inputForm.insertColumn)
            .subscribe(() => this.handleResponse(),
                error => this.handleError(error));
    }

     private handleResponse(): void {
        this.loaderService.hide();
        this.successMessage = 'Successfully added to queue!';
    }

    private handleError(error: HttpErrorResponse): void {
        this.loaderService.hide();
        this.errorMessage = error.message;
    }

    public receiveStatus($event): void {
        this.isStatusesView = $event;
    }
}
