import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AppConfig } from 'src/app/app.config';
import { Product } from 'src/app/models/product.model';
import { MiniStoreService } from 'src/app/services/mini-store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public products: Product[] = [];
  public query: string = '';
  constructor(
    private _products: ProductsService,
    private _route: ActivatedRoute,
    appConfig: AppConfig,
    private _mini: MiniStoreService
  ) {

  }

  ngOnInit(): void {
    document.title = 'Search | Ecommerce';
    this._route.paramMap.subscribe({
      next: (params) => {
        this.query = params.get('query');
        this.performSearch();
      },
      error: (err) => console.log(err)
    }
    );
  }
  private performSearch(): void {
    this._mini.setIsLoading(true);
    this._products.searchProducts(this.query).subscribe(
      {
        next: (prod) => this.products = prod,
        error: (err) => {
          console.log(err);
          this._mini.setIsLoading(false);
        },
        complete: () => this._mini.setIsLoading(false)
      }
    );
  }

}
