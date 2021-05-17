import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { toast } from 'bulma-toast';
import { observable, Observable, Observer } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { OrderItem } from 'src/app/models/orderItem.model';
import { Product } from 'src/app/models/product.model';
import { MiniStoreService } from 'src/app/services/mini-store.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public quantity = 1;
  public product = new Product();
  public productsEndPoint: string;
  public imagesEndPoint: string = '';

  constructor(
    private _client: HttpClient,
    appConfig: AppConfig,
    private _route: ActivatedRoute,
    private _mini: MiniStoreService
  ) {
    this.imagesEndPoint = appConfig.imagesEndpoint;
    this.productsEndPoint = appConfig.productsEndpoint;
  }

  ngOnInit(): void {

    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        this._mini.setIsLoading(true);
        const categorySlug = params.get('category_slug');
        const productSlug = params.get('product_slug');
        const productId = params.get('id');
        let obs: Observable<Product>;
        if (productId) {
          obs = this._client.get<Product>(`${this.productsEndPoint}${productId}`);
        } else {
          obs = this._client.get<Product>(`${this.productsEndPoint}${categorySlug}/${productSlug}`);
        }

        obs.subscribe(
          (prod) => {
            this.product = prod;
            document.title = `${this.product?.name} | Ecommerce`;
          }
          ,
          (err) => {
            console.log(err);
            this._mini.setIsLoading(false);
            document.title = `Detail | Ecommerce`;
          },
          () => this._mini.setIsLoading(false)
        );
      }
    );
  }
  /**
   * setLoading
   */
  public setLoading(state: boolean): void {
    this._mini.setIsLoading(state);
  }


  public addToCart(): void {
    if (isNaN(this.quantity) || this.quantity < 1) {
      this.quantity = 1;
    }
    const item: OrderItem = {
      product: this.product,
      quantity: this.quantity
    };
    this._mini.addToCart(item);
    toast({
      message: 'The Product was added to the cart',
      type: 'is-success',
      dismissible: true,
      pauseOnHover: true,
      duration: 2000,
      position: 'bottom-right'
    });
    this.quantity = 1;
  }

}
