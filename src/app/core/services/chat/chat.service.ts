import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  newMessageNotif: HTMLAudioElement;
  stream: any;
  constructor(private socket: Socket) {
    this.initAudioElement();
  }

  listen(eventName: string): Observable<any> {
    console.log('listen to :', eventName);
    return this.socket.fromEvent(eventName);
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  connectSocket(username: string, userID: string, adminName: string) {
    console.log('connection service ok..');
    this.socket.ioSocket.io.opts.query = { username, userID, adminName };
    this.socket.ioSocket.userID = userID;

    this.socket.connect();
  }

  disconnetSocket() {
    this.socket.disconnect();
  }

  initAudioElement() {
    this.newMessageNotif = this.createAudioElement(
      'assets/notif-new-message.ogg'
    );
  }

  createAudioElement(src: string) {
    const audioElement = document.createElement('audio');
    audioElement.style.display = 'none';
    audioElement.src = src;
    document.body.appendChild(audioElement);
    return audioElement;
  }

  async enableMyVideoStream({ video = true, audio = true }): Promise<void> {
    await navigator.mediaDevices
      .getUserMedia({
        video,
        audio,
      })
      .then((stream) => {
        this.stream = stream;
      });
  }
}
