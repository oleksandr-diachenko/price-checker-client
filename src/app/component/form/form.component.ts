import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PriceService} from 'app/service/price.service';
import {SnackBarService} from '../../service/snack-bar.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../service/alert.service';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
    priceCheckForm: FormGroup;

    loading = false;
    submitted = false;
    private priceService: PriceService;

    private formBuilder: FormBuilder;
    private snackBar: SnackBarService;
    private alertService: AlertService;
    private authenticationService: AuthenticationService;

    constructor(priceService: PriceService, formBuilder: FormBuilder, snackBar: SnackBarService,
                alertService: AlertService, authenticationService: AuthenticationService) {
        this.authenticationService = authenticationService;
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
            urlColumn: [1, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]],
            insertColumn: [1, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]]
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
        this.priceService.processFile(formData, this.f.urlColumn.value,
            this.f.insertColumn.value, this.authenticationService.currentUserValue.id)
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
        this.changeFileInputLabel();
    }

    private changeFileInputLabel(): void {
        const space = '&nbsp;&nbsp;&nbsp;';
        const fileName = this.f.file.value;
        document.getElementById('fileInputLabel').innerHTML = fileName
            ? space + fileName
            : space + 'Choose file';
    }

    ngOnDestroy(): void {
        this.snackBar.dismiss();
    }
}
