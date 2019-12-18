import {Component, EventEmitter, Input, Output} from '@angular/core';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent {

  @Input() file: File;
  @Input() checked: boolean;

  @Output() uncheckedEvent = new EventEmitter<boolean>();

  constructor() {
  }

  getCurrentFileName(fileName: string) {
    return new Date().valueOf() + '_' + fileName;
  }

  download() {
    saveAs(this.file, this.getCurrentFileName(this.file.name))
  }

  uncheck() {
    this.uncheckedEvent.emit(false)
  }
}
