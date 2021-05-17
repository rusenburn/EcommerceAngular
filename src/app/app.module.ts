// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { CategoryDetailComponent } from './components/categories/category-detail/category-detail.component';
import { ProductBoxComponent } from './components/products/product-box/product-box.component';
import { SearchComponent } from './components/search/search.component';
import { CartDetailComponent } from './components/cart/cart-detail/cart-detail.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { SignupComponent } from './components/account/signup/signup.component';
import { LoginComponent } from './components/account/login/login.component';
import { MyaccountComponent } from './components/account/myaccount/myaccount.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { SuccessComponent } from './components/cart/success/success.component';
import { OrderSummaryComponent } from './components/orders/order-summary/order-summary.component';
import { PageNotFoundComponent } from './components/home/page-not-found/page-not-found.component';


// services
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';

import { AppConfig } from './app.config';


export function tokenGetter(): string {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductDetailComponent,
    CategoryDetailComponent,
    ProductBoxComponent,
    SearchComponent,
    CartDetailComponent,
    CartItemComponent,
    SignupComponent,
    LoginComponent,
    MyaccountComponent,
    CheckoutComponent,
    SuccessComponent,
    OrderSummaryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        // TODO : make it be accessed by config
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: []
      }
    }),
  ],
  providers: [
    { provide: AppConfig, useValue: new AppConfig() },
    CategoriesService,
    ProductsService,
    OrdersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
