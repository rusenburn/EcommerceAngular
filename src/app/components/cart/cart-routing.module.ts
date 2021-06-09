import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';
import { AuthGuardService } from 'src/app/services/guards/auth-guard.service';

const routes = [
  { path: 'cart-detail', component: CartDetailComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
  { path: 'success', component: SuccessComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
