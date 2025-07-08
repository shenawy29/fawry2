import crypto from "crypto";

export default class Book {
    isbn: crypto.UUID;
    title: string;
    year: number;
    price: number;
}
