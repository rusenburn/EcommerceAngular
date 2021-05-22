import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { toast } from 'bulma-toast';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/app.config';
import { OrderItem } from 'src/app/models/orderItem.model';
import { Product } from 'src/app/models/product.model';
import { MiniStoreService } from 'src/app/services/mini-store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  public quantity = 1;
  public product = new Product();
  public imagesEndPoint: string = '';

  constructor(
    private _products: ProductsService,
    appConfig: AppConfig,
    private _route: ActivatedRoute,
    private _mini: MiniStoreService
  ) {
    this.imagesEndPoint = appConfig.imagesEndpoint;
  }

  ngOnInit(): void {

    this._route.paramMap.subscribe(
      (params: ParamMap) => {
        this._mini.setIsLoading(true);
        const categorySlug = params.get('category_slug');
        const productSlug = params.get('product_slug');
        const productId = +params.get('id');
        let obs: Observable<Product>;
        if (productId) {
          obs = this._products.getProductById(productId);
        } else {
          obs = this._products.getProductbySlugs(categorySlug, productSlug);
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
