import crypto from "crypto";
import Book from "../abstract/Book";

export default class DemoBook extends Book {
    constructor(isbn: crypto.UUID, title: string, year: number, price: number) {
        super(isbn, title, year, price);
    }

    buy(_purchase: {
        quantity: number;
        customer_email: string;
        customer_address: string;
    }): number {
        throw new Error("Cannot buy a Demo Book.");
    }
}

export class DemoBookBuilder {
    private _isbn: crypto.UUID;
    private _title: string;
    private _year: number;
    private _price: number;

    constructor() {
        this._isbn = crypto.randomUUID() as crypto.UUID;
        this._title = "";
        this._year = new Date().getFullYear();
        this._price = 0;
    }

    setISBN(isbn: crypto.UUID): DemoBookBuilder {
        this._isbn = isbn;
        return this;
    }

    setTitle(title: string): DemoBookBuilder {
        this._title = title;
        return this;
    }

    setYear(year: number): DemoBookBuilder {
        this._year = year;
        return this;
    }

    setPrice(price: number): DemoBookBuilder {
        this._price = price;
        return this;
    }

    build(): DemoBook {
        return new DemoBook(this._isbn, this._title, this._year, this._price);
    }
}
