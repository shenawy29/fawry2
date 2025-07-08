import MailService from "../../services/MailService";
import Book from "../abstract/Book";
import crypto from "crypto";

export default class DigitalBook extends Book {
    public filetype: string;

    constructor(
        isbn: crypto.UUID,
        title: string,
        year: number,
        price: number,
        filetype: string,
    ) {
        super(isbn, title, year, price);
        this.filetype = filetype;
    }

    buy(purchase: {
        quantity: number;
        customer_email: string;
        customer_address: string;
    }): number {
        MailService.send(this, purchase.customer_email);
        return this.price * purchase.quantity;
    }
}

export class DigitalBookBuilder {
    private _isbn: crypto.UUID;
    private _title: string;
    private _year: number;
    private _price: number;
    private _filetype: string;

    constructor() {
        this._isbn = crypto.randomUUID() as crypto.UUID;
        this._title = "";
        this._year = new Date().getFullYear();
        this._price = 0;
        this._filetype = "pdf";
    }

    setISBN(isbn: crypto.UUID): DigitalBookBuilder {
        this._isbn = isbn;
        return this;
    }

    setTitle(title: string): DigitalBookBuilder {
        this._title = title;
        return this;
    }

    setYear(year: number): DigitalBookBuilder {
        this._year = year;
        return this;
    }

    setPrice(price: number): DigitalBookBuilder {
        this._price = price;
        return this;
    }

    setFiletype(filetype: string): DigitalBookBuilder {
        this._filetype = filetype;
        return this;
    }

    build(): DigitalBook {
        return new DigitalBook(
            this._isbn,
            this._title,
            this._year,
            this._price,
            this._filetype,
        );
    }
}
