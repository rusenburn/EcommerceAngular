import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart.model';
import { Order } from 'src/app/models/order.model';
import { OrderItem } from 'src/app/models/orderItem.model';
import { MiniStoreService } from 'src/app/services/mini-store.service';
import { OrdersService } from 'src/app/services/orders.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart: Cart = { items: [] };
  checkoutForm: FormGroup;
  stripe: stripe.Stripe;
  card: stripe.elements.Element;
  orderData: Order = new Order();
  errors: string[] = []; // for server errors
  step = 0;
  public isLoading = false;
  constructor(
    private _mini: MiniStoreService,
    private _orders: OrdersService,
    private _router: Router,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    document.title = 'Checkout | Ecommerce';
    this.cart = this._mini.cart;
    this._mini.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    if (this.cartTotalLength > 0) {
      this.InitializeInformationForm();
    }
  }

  public getItemTotal(item: OrderItem): number {
    return item.quantity * item.product.price;
  }
  public get cartTotalPrice(): number {
    return this.cart.items.reduce((acc, curVal) => {
      return acc += curVal.quantity * curVal.product.price;
    }, 0);
  }
  public get cartTotalLength(): number {
    return this.cart.items.reduce((acc, curVal) => {
      return acc += curVal.quantity;
    }, 0);
  }


  public onInformationFormSubmit(): void {
    this.step = 2;
    this.mapInformationFormToModel();
    this.InitilizeStripeForm();
  }

  public submitForm(): void {
    this.errors = [];
    if (!this.errors.length) {
      this._mini.setIsLoading(true);
      // TODO Check This
      this.stripe.createToken(this.card)
        .then(result => {
          if (result.error) {
            this._mini.setIsLoading(false);
            this.errors.push('Something went wrong with Stripe . Please try again');
            console.log(result.error.message);
          } else {
            this.stripeTokenHandler(result.token);
          }
        });
    }
  }
  private async stripeTokenHandler(token: stripe.Token): Promise<any> {
    const items: OrderItem[] = this.getOrderItems();
    this.orderData.orderItems = items;
    this.orderData.stripeToken = token.id;

    // not finished yet
    this._orders.createCharge(this.orderData).subscribe({
      next: (response) => {
        this._mini.clearCart();
        this._mini.setIsLoading(false);
        this._router.navigate(['/cart/success']);
      },
      error: (err) => {
        console.log(err);
        this._mini.setIsLoading(false);
      }
    });
  }

  private InitializeInformationForm(): void {
    this.checkoutForm = this._fb.group({
      firstName: [this.orderData.firstName, Validators.required],
      lastName: [this.orderData.lastName, Validators.required],
      email: [this.orderData.email, [Validators.required, Validators.email]],
      phone: [this.orderData.phone, Validators.required],
      address: [this.orderData.address, Validators.required],
      zipcode: [this.orderData.zipcode, Validators.required],
      place: [this.orderData.place, Validators.required],
    });
    this.step = 1;
  }

  private InitilizeStripeForm(): void {
    this.step = 2;
    this.stripe = Stripe('pk_test_klA1LyOPD0xIKPFB2MBbl78G00xW0C38oX');
    const elements = this.stripe.elements();
    const style = {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#32325d'
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = elements.create('card', { hidePostalCode: true, style });
    this.card.mount('#card-element');
  }

  private mapInformationFormToModel(): void {
    this.orderData.firstName = this.checkoutForm.value.firstName;
    this.orderData.lastName = this.checkoutForm.value.lastName;
    this.orderData.email = this.checkoutForm.value.email;
    this.orderData.address = this.checkoutForm.value.address;
    this.orderData.phone = this.checkoutForm.value.phone;
    this.orderData.zipcode = this.checkoutForm.value.zipcode;
    this.orderData.place = this.checkoutForm.value.place;
  }

  private getOrderItems(): OrderItem[] {
    const items: OrderItem[] = [];
    for (const item of this.cart.items) {
      const obj: OrderItem = {
        product: item.product,
        quantity: item.quantity,
        price: item.product.price * item.quantity
      };
      items.push(obj);
    }
    return items;
  }

  // public get isLoading(): boolean {
  //   return this._mini.isLoading;
  // }

}
