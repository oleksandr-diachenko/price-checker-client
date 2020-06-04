import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {saveAs} from 'file-saver';
import {PriceService} from 'app/service/price.service';
import {MatPaginator} from '@angular/material';
import {SnackBarService} from '../../service/snack-bar.service';
import {empty, interval, Subscription} from 'rxjs';
import {catchError, startWith, switchMap} from 'rxjs/operators';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, OnDestroy {

    columns = ['name', 'status', 'acceptedTime', 'download'];
    dataSource = new MatTableDataSource<string>([]);
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    subscription: Subscription;

    private authenticationService: AuthenticationService;
    private snackBar: SnackBarService;
    private priceService: PriceService;

    constructor(priceService: PriceService, snackBar: SnackBarService, authenticationService: AuthenticationService) {
        this.priceService = priceService;
        this.snackBar = snackBar;
        this.authenticationService = authenticationService;
    }

    private static getCurrentFileName(fileName: string) {
        return new Date().valueOf() + '_' + fileName;
    }

    ngOnInit(): void {
        this.subscribeToStatuses();
        this.dataSource.paginator = this.paginator;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.snackBar.dismiss();
    }

    private subscribeToStatuses() {
        const userId = this.authenticationService.currentUserValue.id;
        this.subscription = interval(5000)
            .pipe(startWith(0),
                switchMap(() => this.priceService.getFileStatuses(userId)
                    .pipe(catchError(() => this.handleError()))))
            .subscribe(data => this.handleFileStatusesResponse(data));
    }

    private handleError() {
        this.snackBar.openRedSnackBar('Table not updated');
        return empty();
    }

    private handleFileStatusesResponse(data: any): void {
        this.snackBar.dismiss();
        this.dataSource.data = data;
    }

    public download(fileId: number, name: string) {
        this.priceService.getFileById(fileId)
            .subscribe(data => {
                console.log(data);
                if (data.byteLength) {
                    const blob: any = new Blob([data], {type: 'application/binary'});
                    blob.lastModifiedDate = new Date();
                    blob.name = StatusComponent.getCurrentFileName(StatusComponent.getCurrentFileName(name));
                    const file = blob as File;
                    saveAs(file, StatusComponent.getCurrentFileName(file.name));
                }
            });
    }
}
