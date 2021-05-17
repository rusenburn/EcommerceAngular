import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { MiniStoreService } from 'src/app/services/mini-store.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.css']
})
export class CartDetailComponent implements OnInit {
  public cart: Cart = { items: [] };
  constructor(
    private _mini: MiniStoreService
  ) { }

  ngOnInit(): void {
    this.cart = this._mini.cart;
    document.title = 'Cart | Ecommerce';
  }


  public get cartTotalLength(): number {
    return this.cart.items.reduce((acc, currentItem) => {
      return acc += currentItem.quantity;
    }, 0);
  }

  public get cartTotalPrice(): number {
    return this.cart.items.reduce((acc, currentItem) => {
      return acc += currentItem.product.price * currentItem.quantity;
    }, 0);
  }


}
