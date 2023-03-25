import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicEntry } from '../../schemas/music.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/GameMoods');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/GameMoods/${id}`);
  }

  create(user: MusicEntry): Observable<any> {
    return this.mainService._POST(`/api/GameMoods/`, user);
  }

  update(id: string, body: MusicEntry): Observable<any> {
    return this.mainService._PUT('/api/GameMoods/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/GameMoods/', id);
  }
}
