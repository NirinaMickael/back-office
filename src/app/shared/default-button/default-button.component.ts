import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent implements OnInit {

  @Input() text
  @Output() clicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  click(): void {
    this.clicked.emit('clicked');
  }
}
