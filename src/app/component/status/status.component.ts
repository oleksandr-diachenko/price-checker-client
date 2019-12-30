import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {

  constructor() { }

  @Input() status: boolean;

  @Output() unstatusEvent = new EventEmitter<boolean>();

  unstatus() {
    this.unstatusEvent.emit(false)
  }
}
