import { Injectable } from '@angular/core';
import { Cart } from '../models/cart.model';
import { OrderItem } from '../models/orderItem.model';

@Injectable({
  providedIn: 'root'
})
export class MiniStoreService {
  private readonly TOKEN_NAME = 'token';
  private readonly CART_NAME = 'cart';
  public isLoading = false;
  public cart: Cart = { items: [] };
  public token = '';
  public isAuthenticated = false;
  constructor() { }

  // mutations
  public InitializeStore(): void {
    if (this.checkCart()) {
      this.cart = this.getCart();
    } else {
      // localStorage.setItem('cart', JSON.stringify(this.cart));
      this.saveCart();
    }

    if (
      // localStorage.getItem('token')
      this.checkToken()
    ) {
      // this.token = localStorage.getItem('token');
      this.token = this.getToken();
      this.isAuthenticated = true;
    } else {
      this.token = '';
      this.isAuthenticated = false;
    }
  }

  public setIsLoading(status: boolean): void {
    this.isLoading = status;
  }

  // CART
  public addToCart(item: OrderItem): void {
    const exists = this.cart.items.filter(i => i.product.id === item.product.id);
    if (exists.length) {
      exists[0].quantity = exists[0].quantity + item.quantity;
    } else {
      this.cart.items.push(item);
    }
    // localStorage.setItem('cart', JSON.stringify(this.cart));
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
    // localStorage.setItem('cart', JSON.stringify(this.cart));
    this.saveCart();
  }

  // Token and authentication
  public setToken(token: string): void {
    this.token = token;
    this.isAuthenticated = true;
    this.saveToken();
  }

  public removeToken(): void {
    this.token = '';
    this.isAuthenticated = false;
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
}
