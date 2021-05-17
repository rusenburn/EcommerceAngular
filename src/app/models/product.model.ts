import { Category } from './category.model';

export class Product {
    public id?: number;
    public categoryId?: number;
    public category?: Category;
    public name?: string;
    public slug?: string;
    public description?: string;
    public price?: number;
    public image?: string;
    public thumbnail?: string;
    public dateAdded?: Date;
}

