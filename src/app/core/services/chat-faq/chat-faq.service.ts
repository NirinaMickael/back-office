import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatFaqEntry } from '../../schemas/chat-faq.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class ChatFaqService {

  baseUrl = "/api/chatfaqs/"

  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET(this.baseUrl);
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`${this.baseUrl}${id}`);
  }

  create(chatFaq: ChatFaqEntry): Observable<any> {
    return this.mainService._POST(this.baseUrl, chatFaq);
  }

  update(id: string, body: ChatFaqEntry): Observable<any> {
    return this.mainService._PUT(this.baseUrl, id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE(this.baseUrl, id);
  }
}
