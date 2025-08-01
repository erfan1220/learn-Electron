import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private brands_apiUrl = 'http://localhost:5000/api/brands';
  private sellers_apiUrl = `http://localhost:5000/api/sellers`;
  private products_apiUrl = 'http://localhost:5000/api/products';

  private http: HttpClient = inject(HttpClient);

  getBrands(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.brands_apiUrl);
  }

  getSellers(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(this.sellers_apiUrl);
  }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.products_apiUrl);
  }

  getDetails(params: { phoneId?: number }): Observable<any> {
    const url = 'http://localhost:5000/api/details';
    return this.http.get<any>(url, { params });
  }
}
