import crypto from "crypto";

export default abstract class Book {
    isbn: crypto.UUID;
    title: string;
    year: number;
    price: number;

    abstract buy(purchase: {
        quantity: number;
        customer_email: string;
        customer_address: string;
    }): number;
}
