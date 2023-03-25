import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OeuvreEntry } from '../../schemas/oeuvre.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class OeuvreService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/product');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/product/${id}`);
  }

  createOeuvre(oeuvre: OeuvreEntry): Observable<any> {
    return this.mainService._POST(`/api/product/`, oeuvre);
  }

  update(id: string, body: OeuvreEntry): Observable<any> {
    return this.mainService._PUT('/api/product/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/product/', id);
  }
}
