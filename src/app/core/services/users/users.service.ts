import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserEntry } from '../../schemas/users.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/users');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/users/${id}`);
  }

  createUser(user: UserEntry): Observable<any> {
    return this.mainService._POST(`/api/users/`, user);
  }

  update(id: string, body: UserEntry): Observable<any> {
    return this.mainService._PUT('/api/users/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/users', id);
  }
}
