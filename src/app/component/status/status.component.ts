import { Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MatTableModule} from '@angular/material/table';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit{

  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;

  displayedColumns = ['id', 'name', 'status', 'fileId', 'download'];

  dataSource: MatTableDataSource<string>;

 ngOnInit() {
    this.connect();
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

  constructor() {
   this.dataSource = new MatTableDataSource<string>([]);
  }

  @Input() status: boolean;

  @Output() unstatusEvent = new EventEmitter<boolean>();

  unstatus() {
    this.unstatusEvent.emit(false)
  }

  download(fileId: numeric) {
    console.log('Clicked download id: ' + fileId)
  }
}
