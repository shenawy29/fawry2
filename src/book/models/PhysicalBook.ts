import crypto from "crypto";
import ShippingService from "../../services/ShippingService";
import Book from "../abstract/Book";

export default class PhysicalBook extends Book {
    public stock: number;

    constructor(
        isbn: crypto.UUID,
        title: string,
        year: number,
        price: number,
        stock: number,
    ) {
        super(isbn, title, year, price);
        this.stock = stock;
    }

    buy(purchase: {
        quantity: number;
        customer_email: string;
        customer_address: string;
    }): number {
        if (this.stock < purchase.quantity) {
            throw new Error("Book out of stock!");
        }

        this.stock -= purchase.quantity;
        ShippingService.send(this, purchase.customer_address);

        return this.price * purchase.quantity;
    }
}

export class PhysicalBookBuilder {
    private _isbn: crypto.UUID;
    private _title: string;
    private _year: number;
    private _price: number;
    private _stock: number;

    constructor() {
        this._isbn = crypto.randomUUID();
        this._title = "";
        this._year = new Date().getFullYear();
        this._price = 0;
        this._stock = 0;
    }

    setISBN(isbn: crypto.UUID): PhysicalBookBuilder {
        this._isbn = isbn;
        return this;
    }

    setTitle(title: string): PhysicalBookBuilder {
        this._title = title;
        return this;
    }

    setYear(year: number): PhysicalBookBuilder {
        this._year = year;
        return this;
    }

    setPrice(price: number): PhysicalBookBuilder {
        this._price = price;
        return this;
    }

    setStock(stock: number): PhysicalBookBuilder {
        this._stock = stock;
        return this;
    }

    build(): PhysicalBook {
        return new PhysicalBook(
            this._isbn,
            this._title,
            this._year,
            this._price,
            this._stock,
        );
    }
}
