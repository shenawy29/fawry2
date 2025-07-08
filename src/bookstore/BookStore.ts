import Book from "../book/abstract/Book";
import crypto from "crypto";

export default class BookStore {
    inventory: Map<crypto.UUID, Book> = new Map();

    addBook(book: Book) {
        if (this.inventory.has(book.isbn)) {
            throw new Error("Book already exists.");
        }

        this.inventory.set(book.isbn, book);
    }

    removeOutdatedBooksBefore(year: number) {
        for (const [isbn, book] of this.inventory.entries()) {
            if (book.year < year) {
                this.inventory.delete(isbn);
            }
        }
    }

    buyBook(
        isbn: crypto.UUID,
        quantity: number,
        address: string,
        email: string,
    ) {
        const book_in_inventory = this.inventory.get(isbn);

        if (!book_in_inventory) {
            throw new Error("Book doesn't exist.");
        }

        return book_in_inventory.buy({
            quantity,
            customer_address: address,
            customer_email: email,
        });
    }
}
