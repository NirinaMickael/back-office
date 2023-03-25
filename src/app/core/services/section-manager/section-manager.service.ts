import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionEntry } from '../../schemas/section.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class SectionManagerService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/sections');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/sections/${id}`);
  }

  create(user: SectionEntry): Observable<any> {
    return this.mainService._POST(`/api/sections/`, user);
  }

  update(id: string, body: SectionEntry): Observable<any> {
    return this.mainService._PUT('/api/sections/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/sections/', id);
  }
}
