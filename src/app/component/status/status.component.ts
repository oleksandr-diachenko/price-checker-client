import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
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

  displayedColumns = ['id', 'name', 'status', 'fileId'];
  arr: any[] = [{"id":38,"name":"SweetCorea.xlsx","status":"COMPLETED","fileId":37}];

  dataSource = new MatTableDataSource(this.arr);

 ngOnInit() {
  let ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);
      let that = this;
      this.stompClient.connect({}, function(frame) {
        that.stompClient.subscribe("/statuses", (message) => {
          if(message.body) {
            this.dataSource = new MatTableDataSource(JSON.parse(message.body));
          }
        });
      });
  }

  constructor() {
  }

  @Input() status: boolean;

  @Output() unstatusEvent = new EventEmitter<boolean>();

  unstatus() {
    this.unstatusEvent.emit(false)
  }
}
