import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LoginComponent } from './components/account/login/login.component';
// import { MyaccountComponent } from './components/account/myaccount/myaccount.component';
// import { SignupComponent } from './components/account/signup/signup.component';
import { CartDetailComponent } from './components/cart/cart-detail/cart-detail.component';
import { CheckoutComponent } from './components/cart/checkout/checkout.component';
import { SuccessComponent } from './components/cart/success/success.component';
import { CategoryDetailComponent } from './components/categories/category-detail/category-detail.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/home/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { SearchComponent } from './components/search/search.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { HasFormCanDeactivateGuardService } from './services/guards/has-form-can-deactivate-guard.service';


const routes: Routes = [
  { path: 'home', component: HomeComponent, canDeactivate: [HasFormCanDeactivateGuardService] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'products/:category_slug/:product_slug', component: ProductDetailComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'categories/slug/:category_slug', component: CategoryDetailComponent },
  { path: 'cart/cart-detail', component: CartDetailComponent },
  { path: 'cart/checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
  { path: 'cart/success', component: SuccessComponent, canActivate: [AuthGuardService] },
  // { path: 'account/signup', component: SignupComponent, canDeactivate: [HasFormCanDeactivateGuardService] },
  // { path: 'account/login', component: LoginComponent },
  // { path: 'account/my-account', component: MyaccountComponent, canActivate: [AuthGuardService] },
  {
    path: 'account',
    loadChildren: () => import('./components/account/account.module')
      .then(m => m.AccountModule)
  },
  { path: '**', component: PageNotFoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
