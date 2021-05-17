import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {
  public orders: Order[] = [];
  constructor(
    private _auth: AuthService,
    private _orders: OrdersService,

  ) { }

  ngOnInit(): void {
    document.title = 'My Account | Ecommerce';

    this.getMyOrders();
  }
  public getMyOrders(): void {
    this._orders.getMyOrder().subscribe(
      {
        next: (orders) => {
          this.orders = orders;
        }
        , error: (err) => {
          console.log(err);
        }
      }
    );
  }

  public logout(): void {
    this._auth.logout();
  }

}
