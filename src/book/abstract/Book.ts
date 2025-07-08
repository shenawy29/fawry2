import crypto from "crypto";

export default abstract class Book {
    isbn: crypto.UUID;
    title: string;
    year: number;
    price: number;

    constructor(isbn: crypto.UUID, title: string, year: number, price: number) {
        this.isbn = isbn;
        this.title = title;
        this.year = year;
        this.price = price;
    }

    abstract buy(purchase: {
        quantity: number;
        customer_email: string;
        customer_address: string;
    }): number;
}
