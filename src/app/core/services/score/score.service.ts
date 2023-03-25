import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  // Get all logs
  getAllScore(): Observable<any> {
    return this.http.get<any>(`${environment.SERVER_URL}/api/scores/`)
  }
}
