import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor(private http: HttpClient) { }

  comparePassword(input: any): Observable<any> {
    return this.http.post(`${environment.SERVER_URL}/api/users/updateme`, input);
  }
}
