import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryEntry } from '../../schemas/caterogy.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/category');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/category/${id}`);
  }

  createCategory(artist: CategoryEntry): Observable<any> {
    return this.mainService._POST(`/api/category/`, artist);
  }

  update(id: string, body: CategoryEntry): Observable<any> {
    return this.mainService._PUT('/api/category/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/category', id);
  }
}
