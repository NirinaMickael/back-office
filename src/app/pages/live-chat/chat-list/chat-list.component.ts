import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/schemas/chat-user.schema';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  @Input() userList: User[];
  @Input() admin: string;

  @Output() selectedUser = new EventEmitter<any>()

  activeUser;

  constructor() { }

  ngOnInit(): void {
  }

  selectUser(user) {
    //if(this.isChatLocked(user)) return;
    this.activeUser = user
    this.selectedUser.emit(user)
  }

  isChatLocked(user: User) {
    return user.chatAccepted && !(user.chatAcceptedBy === this.admin)
  }

}
