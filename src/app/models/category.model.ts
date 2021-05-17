import { Product } from './product.model';

export class Category {
    public id?: number;
    public name?: string;
    public slug?: string;
    public products: Product[];
}
