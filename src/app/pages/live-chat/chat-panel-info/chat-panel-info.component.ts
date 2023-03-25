import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/schemas/chat-user.schema';

@Component({
  selector: 'app-chat-panel-info',
  templateUrl: './chat-panel-info.component.html',
  styleUrls: ['./chat-panel-info.component.scss']
})
export class ChatPanelInfoComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }

}
