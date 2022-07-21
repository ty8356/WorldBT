import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { TsneCoordinate } from '../models/tsneCoordinate';
import { TsneCoordinateByHistology } from '../models/tsneCoordinateByHistology';

@Injectable({
providedIn: 'any'
})

export class TsneCoordinatesService {

    baseUrl: string = "";

    constructor(
        private http: HttpClient
    ) {
        // this.baseUrl = `api/tsne-coordinates`;
        this.baseUrl = `http://localhost:5000/tsne-coordinates`;
    }

    fetchAll(): Observable<TsneCoordinate[]> {

        let url = this.baseUrl;

        return this.http.get<TsneCoordinate[]>(url);

    }

    fetchAllGrouped(): Observable<TsneCoordinateByHistology[]> {

        let url = this.baseUrl + '/grouped';

        return this.http.get<TsneCoordinateByHistology[]>(url);

    }
}