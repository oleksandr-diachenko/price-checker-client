import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {PriceService} from 'app/service/price-service/price.service';
import {InputForm} from 'app/model/input-form/input-form';
import {LoaderService} from 'app/service/loader-service/loader.service';
import {interval, Subscription} from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;

  inputForm: InputForm = new InputForm(null, 1, 1);

  intervalSubscription: Subscription;

  status: boolean = false;

  error: string;

  success: string;

  constructor(private priceService: PriceService, private loaderService: LoaderService) {
    let ws = new SockJS(this.serverUrl);
      this.stompClient = Stomp.over(ws);
      let that = this;
      this.stompClient.connect({}, function(frame) {
        that.stompClient.subscribe("/statuses", (message) => {
          if(message.body) {
            console.log(message.body);
            loaderService.hide();
          }
        });
      });
  }

  ngOnInit() {
    this.priceService.pingApi(); //workaround to start api on heroku
  }

  fileProgress(fileInput: any) {
    this.inputForm.file = <File>fileInput.target.files[0];
    this.changeFileInputLabel();
  }

  changeFileInputLabel() {
    document.getElementById('fileInputLabel').innerHTML = this.inputForm.file
      ? this.inputForm.file.name
      : 'Choose file';
  }

  checkPrice() {
    this.loaderService.show();
    const formData = new FormData();
    formData.append('file', this.inputForm.file);
    this.priceService.startPriceChecking(formData, this.inputForm.urlColumn, this.inputForm.insertColumn)
    .subscribe(data => this.handleResponse(),
               error => this.handleError(error));
  }

  handleResponse() {
    this.loaderService.hide();
    this.success = 'Successfully added to queue!';
  }

  handleError(error: HttpErrorResponse) {
    this.loaderService.hide();
    this.error = error.message;
  }

  getCurrentFileName(fileName: string) {
    return new Date().valueOf() + '_' + fileName;
  }

  receiveStatus($event) {
    this.status = $event
  }
}