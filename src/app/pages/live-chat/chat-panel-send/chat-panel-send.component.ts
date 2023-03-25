import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { User } from 'src/app/core/schemas/chat-user.schema';
import { ChatService } from 'src/app/core/services/chat/chat.service';

@Component({
  selector: 'app-chat-panel-send',
  templateUrl: './chat-panel-send.component.html',
  styleUrls: ['./chat-panel-send.component.scss'],
})
export class ChatPanelSendComponent implements OnInit {
  @Output() sendMessage = new EventEmitter<any>();
  @Output() initChat = new EventEmitter<any>();

  @Input() user: User;
  @Input() admin: string;

  message;
  showEmojiPicker = false;
  files: any[] = [];
  activateChatBar = true;
  showDesabledMessage = false;

  @ViewChild('msgTextarea')
  textarea: ElementRef;

  isShiftHolded = false;

  constructor(private chat: ChatService) {}

  ngOnInit(): void {
    this.handleOtherAdminAcceptBeforeYou()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reInitDefaultValues();
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

  }

  reInitDefaultValues() {
    this.activateChatBar = true;
    this.showDesabledMessage = false;
  }

  send() {
    if ((this.message && this.message.trim()) || this.files.length) {
      let message = this.message ? this.message.trim() : ''
      this.sendMessage.emit({ message, files: this.files });
      this.message = '';
      this.files = [];
    }
  }

  addEmoji(event) {
    const cursPos = this.textarea.nativeElement.selectionStart;

    const { message } = this;
    const emoji = event.emoji.native;
    let text;
    text = message
      ? `${message.slice(0, cursPos)}${emoji}${message.slice(cursPos)}`
      : emoji;

    text = text.replace('undefined', '');

    this.message = text;
    this.showEmojiPicker = false;
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  onFileChange(event) {
    console.log('file event', event.target.files);
    if (!this.isFileAreadySelected(event.target.files[0])) {

      //check file size
      // not allow 25M and more
      const val = Math.round(event.target.files[0].size/1024/1024 * 100) /100
      if (val > 30) {
        alert("Veuillez choisir un fichier inférieur à 30 Mb");
        event.target.value = '';
        return
      }
      this.files = [...this.files, ...event.target.files];
    }
    event.target.value = '';
  }

  isFileAreadySelected(file) {
    return (
      this.files.filter((el) => {
        return file.name === el.name;
      }).length > 0
    );
  }

  removeFile(file) {
    console.log('remove file', file);
    this.files = this.files.filter((el) => {
      return el.name !== file.name;
    });
  }

  keyDown(event) {
    if (event.keyCode === 16){ // SHIFT
      this.isShiftHolded = true;
      console.log('holdon')
    }
  }

  keyUp(event) {
    if (event.keyCode === 16) {
      this.isShiftHolded = false;
    } else if (event.keyCode === 13 && !this.isShiftHolded) {
      this.send();
    }
  }

  doChat() {
    this.user.chatAccepted = true;
    this.user.chatAcceptedBy = this.admin
    this.activateChatBar = true;
    this.initChat.emit("init-chat");
  }

  isTaken() {
    return this.user.chatAccepted && this.user.chatAcceptedBy !== this.admin
  }

  chatInitialized() {
    return this.user.chatAccepted && this.user.chatAcceptedBy === this.admin
  }

  canRespond() {
    return !this.isTaken() && this.chatInitialized()
  }

  handleOtherAdminAcceptBeforeYou() {
    this.chat.listen('admin-accept-chat').subscribe(({user, admin}) => {
      if (user === this.user.userID) {
        this.activateChatBar = false;
        this.showDesabledMessage = true
      }
    })

  }
}
