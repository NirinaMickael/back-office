import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from 'src/app/core/schemas/chat-user.schema';
import { ChatService } from 'src/app/core/services/chat/chat.service';
import { selectAccount } from 'src/app/core/store/selectors/account.selector';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrls: ['./live-chat.component.scss']
})
export class LiveChatComponent implements OnInit {
  username: string;
  userID: string;
  users: User[] = [];
  selectedUserTochatWith: User;
  message: string;
  isUserConnected: boolean = false;
  user: User;
  unsubscribeAll: Subject<boolean>;

  isCallModalOpen: boolean = false;
  localMessages = [];
  isInCall = false;

  callDialog: any;
  constructor(
    private store: Store,
    private socket: Socket,
    private chat: ChatService,
  ) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.getUsers();
    this.setUserNameAndConnect()
    this.getMessages();
    this.userWantToChat();
  }

  ngOnDestroy() {
    if (this.selectedUserTochatWith) {
      this.chat.emit("set-has-new-message", this.selectedUserTochatWith)
    }
    this.chat.disconnetSocket();
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  setUserNameAndConnect() {
    this.store
      .select(selectAccount)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((account) => {
        if (account) {
          this.username = account?.name ? account?.name : account?.email;
          this.userID = account._id;
          this.connect("admin", "admin", this.username)
        }
      });
  }

  chatToUser(user: User) {
    console.log('chat to..', user);
    // set current hasNewMessage to false before leaving chat
    if (this.selectedUserTochatWith) {
      this.chat.emit("set-has-new-message", this.selectedUserTochatWith)
    }
    this.selectedUserTochatWith = user;
    user.hasNewMessage = false;
    this.chat.emit("set-has-new-message", this.selectedUserTochatWith)
  }

  connect(username, userID, adminName) {
    console.log("connecting sockets...")
    this.chat.connectSocket(username, userID, adminName)
    this.isUserConnected= true
  }

  getUsers() {
    console.log('GETTING USER');
    this.chat
      .listen('chat-users')
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data) => {
        console.log("list from 'users' emition:", data);
        console.log('socket id', this.socket.ioSocket.id);
        data.forEach((user) => {
          user.self = user.userID === this.socket.ioSocket.id;
          if (user.userID === this.socket.ioSocket.id) {
            this.user = user;
            console.log('MYSELF===', this.user);
          }
        });

        this.users = [...data];
      });
  }

  getMessages() {
    this.chat
      .listen('private-message')
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({ content, from, to, createdAt, adminName, indexInLocal }) => {
        for (let i = 0; i < this.users.length; i++) {
          const user: User = this.users[i];
          const fromSelf = this.socket.ioSocket.userID === from;
          const fromSelfAdmin = this.username === adminName;
          if (user.userID === (fromSelf ? to : from)) {
            console.log('new mess', indexInLocal, this.localMessages, fromSelf, fromSelfAdmin);
            if (user.messages) {
              // console.log('has messages', indexInLocal);
              if (indexInLocal !== undefined && fromSelf && fromSelfAdmin) { // Message is sent by actual user
                (user.messages as any).push({
                  content,
                  fromSelf,
                  adminName,
                  fromUnsent: true
                });

                this.localMessages[indexInLocal].unsent = false;
                console.log(user.messages);
                user.messages = user.messages;

              } else { // message is sent by visitor
                user.messages.push({
                  content,
                  fromSelf,
                  adminName,
                  createdAt
                });
              }
            }

            if (user !== this.selectedUserTochatWith) {
              user.hasNewMessage = true;
              this.chat.newMessageNotif.play();

              // put user on top of list
              let userCopy = {...user};
              let userIndex = this.users.findIndex(u => u.userID === user.userID);
              if (userIndex !== -1) {
                this.users.splice(userIndex, 1);
                this.users.unshift(userCopy)
              }
            }


            break;
          }
        }
      });
  }


  sendMessage(event) {
    if (this.selectedUserTochatWith) {
      if (event && !event.message && !event.files.length) {
        return;
      }
      const sendTime = new Date();

      const content = event.message ? event.message.trim() : '';

      let message: any = {
        content,
        to: this.selectedUserTochatWith.userID,
        createdAt: sendTime,
        adminName: this.username,
        indexInLocal: this.localMessages.length,
        unsent: true
      };


      this.chat.emit('private-message', message);

      this.localMessages.push(message);
      this.localMessages = this.localMessages;// For change detection
    }
  }

  userWantToChat() {
    console.log('NEW USER CONNECTED');
    this.chat
      .listen('chat-with-admin')
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((user) => {
        console.log('should push', user);
        user.self = user.userID === this.socket.ioSocket.id;
        let userExists = this.users.filter((u) => u.userID === user.userID);
        console.log('DO USER EXISTS', userExists);
        if (!userExists.length) {
          this.users.unshift(user);
          //this.users = this.users.reverse() // make latest chat appear first
        }
      });
  }

  adminAcceptChat(event) {
    this.chat.emit('admin-accept-chat', {
      user: this.selectedUserTochatWith.userID,
      admin: this.userID
    })
  }
}
