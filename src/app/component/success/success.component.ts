import {Component, EventEmitter, Input, Output} from '@angular/core';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent {

    @Input() success: boolean;

    constructor() {
    }
}
