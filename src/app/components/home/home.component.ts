import { Component, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { Product } from 'src/app/models/product.model';
import { MiniStoreService } from 'src/app/services/mini-store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public imagesEndPoint = '';
  public latestProducts: Product[] = [];
  constructor(private _productsService: ProductsService, appconfig: AppConfig, private _mini: MiniStoreService) {
    this.imagesEndPoint = appconfig.imagesEndpoint;
  }

  ngOnInit(): void {
    document.title = 'Home | Ecommerce';
    this._mini.setIsLoading(true);
    this._productsService.getLatestProducts().subscribe(
      (prod) => {
        this.latestProducts = prod;
        this._mini.setIsLoading(false);
      },
      (error) => {
        console.log(error);
        this._mini.setIsLoading(false);
      }
    );
  }

}
