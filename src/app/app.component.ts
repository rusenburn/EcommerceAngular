import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiniStoreService } from './services/mini-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'EcommerceAngular';
  showMobileMenu: boolean = false;

  constructor(private _mini: MiniStoreService, private _router: Router, private _client: HttpClient) {
  }
  ngOnInit(): void {
    this._mini.InitializeStore();
  }

  public toggleMenuBar(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }
  public get isLoading(): boolean {
    return this._mini?.isLoading;
  }

  public get cartTotalLength(): number {
    let totalLength = 0;
    for (const item of this._mini.cart?.items) {
      totalLength += item.quantity;
    }
    return totalLength;
  }
  public get isAuthenticated(): boolean {
    return this._mini.isAuthenticated;
  }

  public onSubmit(query: string): void {
    this._router.navigate(['/search', { query }]);
  }


}
