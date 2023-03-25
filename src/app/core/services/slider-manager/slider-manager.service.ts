import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SliderEntry } from '../../schemas/slider.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class SliderManagerService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/sliders');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/sliders/${id}`);
  }

  create(user: SliderEntry): Observable<any> {
    return this.mainService._POST(`/api/sliders/`, user);
  }

  update(id: string, body: SliderEntry): Observable<any> {
    return this.mainService._PUT('/api/sliders/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/sliders/', id);
  }
}
