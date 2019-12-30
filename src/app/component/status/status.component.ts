import { Component, Input, Output, EventEmitter,OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit{

  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;

  elements: string[] = [];

 ngOnInit() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/statuses", (message) => {
        if(message.body) {
          this.elements = JSON.parse(message.body);
          //console.log(message.body);
          console.log('*******');
          console.log(this.elements);
        }
      });
    });
  }

  constructor() {
  }

  @Input() status: boolean;

  @Output() unstatusEvent = new EventEmitter<boolean>();

  unstatus() {
  console.log(this.elements);
    this.unstatusEvent.emit(false)
  }
}
