import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';
import { saveAs } from 'file-saver';
import { PriceService } from 'app/service/price-service/price.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit{

  private serverUrl = 'https://price-checker-web.herokuapp.com/socket'
  private title = 'WebSockets chat';
  private stompClient;

  displayedColumns = ['id', 'name', 'status', 'fileId', 'download'];

  dataSource: MatTableDataSource<string>;

 ngOnInit() {
    this.connect();
    this.priceService.getFileStatuses().subscribe(data => this.handleFileStatusesResponse(data));
  }

  handleFileStatusesResponse(data: any) {
    this.dataSource.data = data;
  }
  connect() {
   let ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);
      let that = this;
        this.stompClient.connect({}, function(frame) {
          that.stompClient.subscribe("/statuses", (message) => {
            if(message.body) {
              that.dataSource.data = JSON.parse(message.body);
            }
          });
        }, function(error) {
            that.errorCallBack();
         });
  };

  errorCallBack() {
    setTimeout(() => {
        this.connect();
    }, 1000);
  }

  constructor(private priceService: PriceService) {
   this.dataSource = new MatTableDataSource<string>([]);
  }

  @Input() status: boolean;

  @Output() unstatusEvent = new EventEmitter<boolean>();

  unstatus() {
    this.unstatusEvent.emit(false)
  }

  download(fileId: number, name: string) {
    console.log('Clicked download id: ' + fileId);
    this.priceService.getTable(fileId)
      .subscribe(data => {
      console.log(data);
           if(data.byteLength) {
             var b: any = new Blob([data], { type: 'application/binary' });
              b.lastModifiedDate = new Date();
              b.name = this.getCurrentFileName(this.getCurrentFileName(name));
              let file = <File>b;
              saveAs(file, this.getCurrentFileName(file.name))
           }
       });
  }

  getCurrentFileName(fileName: string) {
          return new Date().valueOf() + '_' + fileName;
      }
}
