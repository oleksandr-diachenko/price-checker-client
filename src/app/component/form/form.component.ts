import {Component} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PriceService} from 'app/service/price-service/price.service';
import {InputForm} from 'app/model/input-form/input-form';
import {LoaderService} from 'app/service/loader-service/loader.service';
import {SnackBarService} from '../../service/snack-bar/snack-bar.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent {

    inputForm = new InputForm(null, 1, 1);

    constructor(private priceService: PriceService, private loaderService: LoaderService, private snackBar: SnackBarService) {
    }

    public fileProgress(fileInput: any): void {
        this.inputForm.file = fileInput.target.files[0] as File;
        this.changeFileInputLabel();
    }

    public checkPrice(): void {
        this.loaderService.show();
        const formData = new FormData();
        formData.append('file', this.inputForm.file);
        this.priceService.processFile(formData, this.inputForm.urlColumn, this.inputForm.insertColumn)
            .subscribe(() => this.handleResponse(),
                error => this.handleError(error));
    }

    private changeFileInputLabel(): void {
        document.getElementById('fileInputLabel').innerHTML = this.inputForm.file
            ? this.inputForm.file.name
            : 'Choose file *';
    }

    private handleResponse(): void {
        this.loaderService.hide();
        this.snackBar.openGreenSnackBar('Successfully added to queue!');
    }

    private handleError(error: HttpErrorResponse): void {
        this.loaderService.hide();
        this.snackBar.openRedSnackBar(error.message);
    }
}
