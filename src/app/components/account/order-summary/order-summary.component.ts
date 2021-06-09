import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { OrderItem } from 'src/app/models/orderItem.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {
  @Input()
  public order: Order = new Order();
  constructor() { }

  ngOnInit(): void {
  }

  public getItemTotal(item: OrderItem): number {
    return item.price;
  }

  public orderTotalLength(order: Order): number {
    return order.orderItems.reduce((acc, orderItem) => {
      return acc += orderItem.quantity;
    }, 0);
  }

  public orderTotalPrice(order: Order): number {
    return order.orderItems.reduce((acc, orderItem) => {
      return acc += orderItem.price;
    }, 0);
  }

  public getItemCurrentCost(item: OrderItem): number {
    return item.quantity * item.product.price;
  }
}
