import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistEntry } from '../../schemas/artists.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/artists');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/artists/${id}`);
  }

  createArtist(artist: ArtistEntry): Observable<any> {
    return this.mainService._POST(`/api/artists/`, artist);
  }

  update(id: string, body: ArtistEntry): Observable<any> {
    return this.mainService._PUT('/api/artists/', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/artists/', id);
  }
}
