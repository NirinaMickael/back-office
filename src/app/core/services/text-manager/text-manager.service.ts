import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TextEntry } from '../../schemas/text.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class TextManagerService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/TextCenters');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/TextCenters/${id}`);
  }

  create(user: TextEntry): Observable<any> {
    return this.mainService._POST(`/api/TextCenters/`, user);
  }

  update(id: string, body: TextEntry): Observable<any> {
    return this.mainService._PUT('/api/TextCenters/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/TextCenters/', id);
  }
}
