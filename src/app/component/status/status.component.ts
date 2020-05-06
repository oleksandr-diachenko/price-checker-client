import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MatTableDataSource} from '@angular/material/table';
import {saveAs} from 'file-saver';
import {PriceService} from 'app/service/price-service/price.service';

@Component({
    selector: 'app-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

    columns = ['id', 'name', 'status', 'acceptedTime', 'download'];
    dataSource: MatTableDataSource<string>;
    @Input() isStatusesView: boolean;
    @Output() private unstatusEvent = new EventEmitter<boolean>();
    private url = '/socket';
    private stomp: Stomp;

    constructor(private priceService: PriceService) {
        this.dataSource = new MatTableDataSource<string>([]);
    }

    private static getCurrentFileName(fileName: string) {
        return new Date().valueOf() + '_' + fileName;
    }

    ngOnInit(): void {
        this.connect();
        this.priceService.getFileStatuses().subscribe(data => this.handleFileStatusesResponse(data));
    }

    private handleFileStatusesResponse(data: any): void {
        this.dataSource.data = data;
    }

    private connect() {
        const ws = new SockJS(this.url);
        this.stomp = Stomp.over(ws);
        const that = this;
        this.stomp.connect({}, () => {
            that.stomp.subscribe('/statuses', (message) => {
                if (message.body) {
                    that.dataSource.data = JSON.parse(message.body);
                }
            });
        }, () => {
            that.errorCallBack();
        });
    }

    private errorCallBack() {
        setTimeout(() => {
            this.connect();
        }, 1000);
    }

    public switchToFormView() {
        this.unstatusEvent.emit(false);
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
