import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusEntry } from '../../schemas/status.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/status');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/status/${id}`);
  }

  createStatus(artist: StatusEntry): Observable<any> {
    return this.mainService._POST(`/api/status/`, artist);
  }

  update(id: string, body: StatusEntry): Observable<any> {
    return this.mainService._PUT('/api/status/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/status/', id);
  }
}
