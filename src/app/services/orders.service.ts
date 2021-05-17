import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../app.config';
import { Order } from '../models/order.model';
import { IHasClientSecret } from '../models/IhasClientSecret.interface';
import { OrderItem } from '../models/orderItem.model';
import { MiniStoreService } from './mini-store.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly baseUrl: string = '';
  constructor(
    private _client: HttpClient,
    private _mini: MiniStoreService,
    appConfig: AppConfig
  ) {
    this.baseUrl = appConfig.ordersEndpoint;
  }

  public createPaymentIntent(items: OrderItem[]): Observable<IHasClientSecret> {
    return this._client.post<IHasClientSecret>(`${this.baseUrl}create-payment-intent`, items, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  public createCharge(order: Order): Observable<Order> {
    return this._client.post<Order>(`${this.baseUrl}checkout`, order, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }


  public getMyOrder(): Observable<Order[]> {
    return this._client.get<Order[]>(`${this.baseUrl}my-orders`);
  }

}
