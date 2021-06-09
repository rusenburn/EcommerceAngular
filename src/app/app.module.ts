// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';

// custom modules
import { SharedModule } from './components/shared.module';

// components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { CategoryDetailComponent } from './components/categories/category-detail/category-detail.component';
import { ProductBoxComponent } from './components/products/product-box/product-box.component';
import { SearchComponent } from './components/search/search.component';
import { PageNotFoundComponent } from './components/home/page-not-found/page-not-found.component';


// services
import { CategoriesService } from './services/categories.service';
import { ProductsService } from './services/products.service';
import { OrdersService } from './services/orders.service';

// config
import { AppConfig } from './app.config';
import config from './app.config.json';



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
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        // TODO : make it be accessed by config
        allowedDomains: config.allowedDomains,
        disallowedRoutes: []
      }
    }),
  ],
  providers: [
    { provide: AppConfig, useValue: new AppConfig() },
    CategoriesService,
    ProductsService,
    OrdersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
