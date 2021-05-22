import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl: string;
  constructor(
    private client: HttpClient,
    appconfig: AppConfig
  ) {
    this.baseUrl = appconfig.productsEndpoint;
  }

  public getLatestProducts(): Observable<Product[]> {
    return this.client.get<Product[]>(`${this.baseUrl}latest-products/`);
  }

  public getProductById(id: number): Observable<Product> {
    return this.client.get<Product>(`${this.baseUrl}${id}`);
  }

  public getProductbySlugs(categorySlug: string, productSlug: string): Observable<Product> {
    return this.client.get<Product>(`${this.baseUrl}${categorySlug}/${productSlug}`);
  }

  public searchProducts(query: string): Observable<Product[]> {
    return this.client.post<Product[]>(`${this.baseUrl}search`, { query }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
