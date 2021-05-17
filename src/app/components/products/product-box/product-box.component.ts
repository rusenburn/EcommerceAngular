import { Component, Input, OnInit } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {
  @Input()
  public product: Product;
  public imagesEndPoint: string = "";
  constructor(
    appConfig:AppConfig,
  ) {
    this.imagesEndPoint = appConfig.imagesEndpoint;
   }

  ngOnInit(): void {
  }

}
