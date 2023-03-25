import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetEntry } from '../../schemas/asset.schema';
import { MainService } from '../main.service';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  constructor(private mainService: MainService) { }

  getAll(): Observable<any> {
    return this.mainService._GET('/api/assets');
  }

  getOneById(id: string): Observable<any> {
    return this.mainService._GET(`/api/assets/${id}`);
  }

  createAsset(asset: AssetEntry): Observable<any> {
    return this.mainService._POST(`/api/assets/`, asset);
  }

  update(id: string, body: AssetEntry): Observable<any> {
    return this.mainService._PUT('/api/assets', id, body);
  }

  delete(id: string): Observable<any> {
    return this.mainService._DELETE('/api/assets/', id);
  }
}
