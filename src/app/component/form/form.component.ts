import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PriceService} from 'app/service/price.service';
import {SnackBarService} from '../../service/snack-bar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../service/alert.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    priceCheckForm: FormGroup;
    loading = false;
    submitted = false;

    private priceService: PriceService;
    private formBuilder: FormBuilder;
    private snackBar: SnackBarService;
    private alertService: AlertService;

    constructor(priceService: PriceService, formBuilder: FormBuilder, snackBar: SnackBarService, alertService: AlertService) {
        this.alertService = alertService;
        this.snackBar = snackBar;
        this.formBuilder = formBuilder;
        this.priceService = priceService;
    }

    private handleResponse(): void {
        this.loading = false;
        this.snackBar.openGreenSnackBar('Successfully added to queue!');
    }

    private handleError(error: HttpErrorResponse): void {
        this.loading = false;
        this.snackBar.openRedSnackBar(error.message);
    }

    ngOnInit(): void {
        this.priceCheckForm = this.formBuilder.group({
            file: ['', Validators.required],
            fileSource: ['', [Validators.required]],
            urlColumn: ['', [Validators.required, Validators.min(1)]],
            insertColumn: ['', [Validators.required, Validators.min(1)]]
        });
    }

    onSubmit() {
        this.submitted = true;
        this.alertService.clear();
        if (this.priceCheckForm.invalid) {
            return;
        }
        this.loading = true;
        const formData = new FormData();
        formData.append('file', this.priceCheckForm.get('fileSource').value);
        this.priceService.processFile(formData, this.f.urlColumn.value, this.f.insertColumn.value)
            .subscribe(() => this.handleResponse(),
                error => this.handleError(error));
    }

    get f() {
        return this.priceCheckForm.controls;
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.priceCheckForm.patchValue({
                fileSource: file
            });
        }
    }
}
