import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl = 'http://localhost:5000/api/addProduct';

  addProduct(body: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, body);
  }

  deleteProduct(productId: number | null): Observable<any> {
    const apiUrl = `http://localhost:5000/api/product/${productId}`;
    return this.http.delete<any>(apiUrl);
  }
}
