import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { Histology } from '../models/histology';

@Injectable({
providedIn: 'any'
})

export class HistologiesService {

    baseUrl: string = "";

    constructor(
        private http: HttpClient
    ) {
        // this.baseUrl = `api/tsne-coordinates`;
        this.baseUrl = `http://localhost:5000/histologies`;
    }

    fetchAll(): Observable<Histology[]> {

        let url = this.baseUrl;

        return this.http.get<Histology[]>(url);

    }
}