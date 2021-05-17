import { Product } from './product.model';

export class OrderItem {
    public product: Product;
    public quantity: number;
    public price?: number;
}
