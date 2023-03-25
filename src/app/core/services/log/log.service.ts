import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  // Get all logs
  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.SERVER_URL}/api/logs/`)
  }
}
