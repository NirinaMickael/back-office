import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WalkableEntry } from '../../schemas/walkable.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class WalkablesService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/walkables');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/walkables/${id}`);
  }

  createWalkable(user: WalkableEntry): Observable<any> {
    return this.mainService._POST(`/api/walkables/`, user);
  }

  update(id: string, body: WalkableEntry): Observable<any> {
    return this.mainService._PUT('/api/walkables/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/walkables/', id);
  }
}
