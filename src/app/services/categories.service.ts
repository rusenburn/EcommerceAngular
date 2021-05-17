import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    appconfig: AppConfig
  ) {
    this.baseUrl = appconfig.categoriesEndpoint;
  }

  public getCategoryBySlug(categorySlug: string): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}slug/${categorySlug}`);
  }

  public getOne(id: number): Observable<Category> {
    return this.httpClient.get<Category>(`${this.baseUrl}${id}`);
  }
}
