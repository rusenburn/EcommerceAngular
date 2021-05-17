import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { observable, Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { MiniStoreService } from 'src/app/services/mini-store.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  public imagesEndPoint: string;
  public category: Category;
  private categoriesEndPoint: string;
  constructor(
    private _client: HttpClient,
    appConfig: AppConfig,
    private _route: ActivatedRoute,
    private _mini: MiniStoreService,
    private _categories: CategoriesService
  ) {
    this.imagesEndPoint = appConfig.imagesEndpoint;
    this.categoriesEndPoint = appConfig.productsEndpoint;
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(
      (param: ParamMap) => {
        this._mini.setIsLoading(true);
        const categorySlug = param.get('category_slug');
        const categoryId = +param.get('id');
        let obs: Observable<Category>;
        if (categoryId) {
          obs = this._categories.getOne(categoryId);
        } else {
          obs = this._categories.getCategoryBySlug(categorySlug);
        }
        obs.subscribe(
          (category) => {
            this.category = category;
            document.title = `${this.category?.name} | Ecommerce`;
          },
          (err) => {
            console.log(err);
            this._mini.setIsLoading(false);
            document.title = `Error | Ecommerce`;
          },
          () => this._mini.setIsLoading(false)
        );
      },
      (err) => console.log(err),
      () => this._mini.setIsLoading(false));
  }

}
