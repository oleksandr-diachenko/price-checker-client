import { Component, Output, EventEmitter, Input } from '@angular/core';
import { InputForm } from 'app/model/input-form/input-form';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-complete',
    templateUrl: './complete.component.html',
    styleUrls: ['./complete.component.scss']
})
export class CompleteComponent {

    @Input() inputForm: InputForm;
    @Input() checked: boolean;

    @Output() checkedEvent = new EventEmitter<boolean>();
        constructor() {
    }

    getCurrentFileName(fileName: string) {
        return new Date().valueOf() + '_' + this.inputForm.file.name;
    }

    download() {
        saveAs(this.inputForm.file, this.getCurrentFileName(this.inputForm.file.name))
    }

    uncheck() {
        this.checkedEvent.emit(false)
    }
}
