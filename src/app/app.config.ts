import config from './app.config.json';

export class AppConfig {
    public readonly apiEndpoint: string;
    public readonly imagesEndpoint: string;
    public readonly productsEndpoint?: string;
    public readonly categoriesEndpoint?: string;
    public readonly ordersEndpoint?: string;
    public readonly authenticationEndpoint?: string;
    constructor() {
        // Note if you change the apiEndpoint here then you must change it in jwtModule
        // ex: https://localhost:5001/api/v1/ => allowed domains are 'localhost:5001'
        // const data = config as any;
        this.apiEndpoint = config.apiEndpoint;
        this.imagesEndpoint = config.imagesEndpoint;
        this.categoriesEndpoint = `${this.apiEndpoint}Categories/`;
        this.productsEndpoint = `${this.apiEndpoint}Products/`;
        this.ordersEndpoint = `${this.apiEndpoint}Orders/`;
        this.authenticationEndpoint = `${this.apiEndpoint}Auth/`;
    }
}
