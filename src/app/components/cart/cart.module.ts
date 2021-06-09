import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { CartDetailComponent } from './cart-detail/cart-detail.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartRoutingModule } from './cart-routing.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessComponent } from './success/success.component';



@NgModule({
  declarations: [
    CartDetailComponent,
    CheckoutComponent,
    SuccessComponent,
    CartItemComponent
  ],
  imports: [
    SharedModule,
    CartRoutingModule
  ]
})
export class CartModule { }
