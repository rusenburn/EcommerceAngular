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
  public isLoading = false;
  public isAuthenticated = false;
  constructor(private _mini: MiniStoreService, private _router: Router, private _client: HttpClient) {
  }
  ngOnInit(): void {
    // TODO : check if it is possible to initialize the store without home component
    this._mini.InitializeStore();
    this._mini.isLoading$.subscribe({
      next: (isloading) => this.isLoading = isloading});
    this._mini.isAuthenticated$.subscribe({
      next: (isAuthenticated) => this.isAuthenticated = isAuthenticated
    });
  }

  public toggleMenuBar(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  public get cartTotalLength(): number {
    let totalLength = 0;
    for (const item of this._mini.cart?.items) {
      totalLength += item.quantity;
    }
    return totalLength;
  }

  public onSubmit(query: string): void {
    this._router.navigate(['/search', { query }]);
  }
}
