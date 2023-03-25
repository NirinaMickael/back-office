import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chat-faq-card',
  templateUrl: './chat-faq-card.component.html',
  styleUrls: ['./chat-faq-card.component.scss']
})
export class ChatFaqCardComponent implements OnInit {

  @Input() faq;
  @Output() editEvent: EventEmitter<any> = new EventEmitter()
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  edit() {
    this.editEvent.emit(this.faq)
  }

  delete() {
    this.deleteEvent.emit(this.faq)
  }

}
