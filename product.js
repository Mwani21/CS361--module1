export class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    withTax() {
        return this.price * 1.16; // 16% tax
    }
}