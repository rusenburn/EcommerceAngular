import { OrderItem } from './orderItem.model';

export class Order {
    // TODO rename it to order or seperate order and cusomer Info
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    zipcode: string;
    place: string;
    orderItems: OrderItem[];
    stripeToken: string;
    paidAmount?: number;
}
