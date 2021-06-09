import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../models/cart.model';
import { OrderItem } from '../models/orderItem.model';

@Injectable({
  providedIn: 'root'
})
export class MiniStoreService {
  private readonly TOKEN_NAME = 'token';
  private readonly CART_NAME = 'cart';
  private _isLoading = new BehaviorSubject<boolean>(false);
  private _isAuthenticated = new BehaviorSubject<boolean>(false);
  public cart: Cart = { items: [] };
  public token = '';

  public get isLoading$(): Observable<boolean> {
    return this._isLoading.asObservable();
  }
  public get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  constructor() {}

  // mutations
  public InitializeStore(): void {
    if (this.checkCart()) {
      this.cart = this.getCart();
    } else {
      this.saveCart();
    }

    if (
      this.checkToken()
    ) {
      this.token = this.getToken();
      this.setAuthentication(true);
    } else {
      this.token = '';
      this.setAuthentication(false);
    }
  }

  public setIsLoading(status: boolean): void {
    this._isLoading.next(status);
  }

  // CART
  public addToCart(item: OrderItem): void {
    const exists = this.cart.items.filter(i => i.product.id === item.product.id);
    if (exists.length) {
      exists[0].quantity = exists[0].quantity + item.quantity;
    } else {
      this.cart.items.push(item);
    }
    this.saveCart();
  }

  public removeFromCart(item: OrderItem): void {
    this.cart.items = this.cart.items.filter(i => i.product.id !== item.product.id);
  }

  public checkCart(): boolean {
    if (localStorage.getItem(this.CART_NAME)) {
      return true;
    }
    return false;
  }
  public saveCart(): void {
    localStorage.setItem(this.CART_NAME, JSON.stringify(this.cart));
  }
  public getCart(): Cart {
    return JSON.parse(localStorage.getItem(this.CART_NAME)) as Cart;
  }
  public clearCart(): void {
    this.cart = { items: [] };
    this.saveCart();
  }

  // Token and authentication
  public setToken(token: string): void {
    this.token = token;
    this.setAuthentication(true);
    this.saveToken();
  }

  public removeToken(): void {
    this.token = '';
    this.setAuthentication(false);
    this.saveToken();
  }

  public checkToken(): boolean {
    if (localStorage.getItem(this.TOKEN_NAME)) {
      return true;
    }
    return false;
  }

  public saveToken(): void {
    localStorage.setItem(this.TOKEN_NAME, this.token);
  }

  public getToken(): string {
    return localStorage.getItem(this.TOKEN_NAME);
  }
  private setAuthentication(state: boolean): void {
    this._isAuthenticated.next(state);
  }
}
