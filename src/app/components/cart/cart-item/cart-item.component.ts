import { Component, Input, OnInit } from '@angular/core';
import { OrderItem } from 'src/app/models/orderItem.model';
import { MiniStoreService } from 'src/app/services/mini-store.service';

@Component({
  selector: '[app-cart-item-row]',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input()
  public item: OrderItem = new OrderItem();
  constructor(
    private _mini: MiniStoreService
  ) { }

  ngOnInit(): void {
  }



  public getItemTotal(item: OrderItem): number {
    return item.quantity * item.product.price;
  }

  public get itemLink(): string {
    return `/products/${this.item?.product.id}`;
  }

  public incrementQuantity(item: OrderItem): void {
    item.quantity += 1;
    this.updateCart();
  }

  public decrementQuantity(item: OrderItem): void {
    item.quantity -= 1;
    if (item.quantity === 0) {
      this._mini.removeFromCart(item);
    }
    this.updateCart();
  }

  public removeFromCart(item: OrderItem): void {
    this._mini.removeFromCart(item);
    this.updateCart();
  }

  private updateCart(): void {
    this._mini.saveCart();
  }
}
