import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {saveAs} from 'file-saver';
import {PriceService} from 'app/service/price-service/price.service';
import {MatPaginator} from '@angular/material';
import {SnackBarService} from '../../service/snack-bar/snack-bar.service';
import {interval} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

    columns = ['id', 'name', 'status', 'acceptedTime', 'download'];
    dataSource = new MatTableDataSource<string>([]);
    @Input() isStatusesView: boolean;
    @Output() private unstatusEvent = new EventEmitter<boolean>();
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private priceService: PriceService, private snackBar: SnackBarService) {
    }

    private static getCurrentFileName(fileName: string) {
        return new Date().valueOf() + '_' + fileName;
    }

    ngOnInit(): void {
        this.subscribeToStatuses();
        this.dataSource.paginator = this.paginator;
    }

    private subscribeToStatuses() {
        interval(5000)
            .pipe(startWith(0),
                switchMap(() => this.priceService.getFileStatuses()))
            .subscribe(data => this.handleFileStatusesResponse(data),
                () => this.snackBar.openRedSnackBar('Table not updated'));
    }

    private handleFileStatusesResponse(data: any): void {
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
