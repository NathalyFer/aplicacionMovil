import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiFakeStoreService {
  private apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  // Metodo GET para Obtener productos
getProducts(): Observable<Product[]> {
  return this.http.get<Product[]>(this.apiUrl);
}

  // Método post para agregar un producto
addProduct(product: Product): Observable<Product> {
  return this.http.post<Product>(this.apiUrl, product);
}

}
