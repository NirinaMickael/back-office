import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  upload(formData): Observable<any> {
    return this.http.post<any>(`${environment.SERVER_URL}/api/uploads/`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
