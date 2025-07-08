import { mock } from "node:test";
import assert from "assert";
import { describe, it } from "node:test";
import BookStore from "../src/bookstore/BookStore";

import PhysicalBook, {
    PhysicalBookBuilder,
} from "../src/book/models/PhysicalBook";

import { DemoBookBuilder } from "../src/book/models/DemoBook";
import { DigitalBookBuilder } from "../src/book/models/DigitalBook";
import MailService from "../src/services/MailService";
import ShippingService from "../src/services/ShippingService";

class BookStoreTests {
    static run() {
        describe("BookStore test suite", () => {
            it("can add books", () => {
                const store = new BookStore();
                const isbn = crypto.randomUUID();

                const book = new PhysicalBookBuilder()
                    .setISBN(isbn)
                    .setPrice(10)
                    .setStock(5)
                    .setTitle("Do Androids Dream of Electric Sheep?")
                    .setYear(1968)
                    .build();

                store.addBook(book);

                assert(store.inventory.has(book.isbn));
            });

            it("can buy physical books", () => {
                const store = new BookStore();
                const isbn = crypto.randomUUID();
                const shippingServiceMock = mock.method(
                    ShippingService,
                    "send",
                );

                const book = new PhysicalBookBuilder()
                    .setISBN(isbn)
                    .setPrice(10)
                    .setStock(1)
                    .setTitle("Land of Zicola")
                    .setYear(2010)
                    .build();

                store.addBook(book);

                const bookInventory = store.inventory.get(
                    book.isbn,
                ) as PhysicalBook;
                const beforeQuantity = bookInventory.stock;

                const quantity = 1;
                store.buyBook(isbn, quantity, "Cairo", "foo@fawry.com");

                assert.strictEqual(
                    bookInventory.stock,
                    beforeQuantity - quantity,
                );
                assert.strictEqual(shippingServiceMock.mock.calls.length, 1);
            });

            it("can buy digital books", () => {
                const store = new BookStore();
                const isbn = crypto.randomUUID();
                const mailServiceMock = mock.method(MailService, "send");

                const book = new DigitalBookBuilder()
                    .setISBN(isbn)
                    .setPrice(10)
                    .setTitle("Amareta")
                    .setYear(2016)
                    .build();

                store.addBook(book);

                const quantity = 1;
                store.buyBook(isbn, quantity, "Cairo", "foo@fawry.com");

                assert.strictEqual(mailServiceMock.mock.calls.length, 1);
            });

            it("can't buy demo books", () => {
                const store = new BookStore();
                const isbn = crypto.randomUUID();

                const book = new DemoBookBuilder()
                    .setISBN(isbn)
                    .setPrice(10)
                    .setTitle("Wahat Al Yaqoub")
                    .setYear(2025)
                    .build();

                store.addBook(book);

                const quantity = 1;

                assert.throws(() => {
                    store.buyBook(isbn, quantity, "Cairo", "foo@gmail.com");
                }, /cannot buy a demo book/i);
            });

            it("can't buy out of stock books", () => {
                const store = new BookStore();
                const isbn = crypto.randomUUID();

                const book = new PhysicalBookBuilder()
                    .setISBN(isbn)
                    .setPrice(10)
                    .setStock(5)
                    .setTitle("Azazeel")
                    .setYear(2012)
                    .build();

                store.addBook(book);

                const quantity = 6;

                assert.throws(() => {
                    store.buyBook(isbn, quantity, "Cairo", "foo@gmail.com");
                }, /out of stock/i);
            });

            it("removes outdated books", () => {
                const store = new BookStore();

                const isbn1 = crypto.randomUUID();
                const isbn2 = crypto.randomUUID();
                const isbn3 = crypto.randomUUID();
                const isbn4 = crypto.randomUUID();

                const book1 = new PhysicalBookBuilder()
                    .setISBN(isbn1)
                    .setPrice(10)
                    .setStock(5)
                    .setTitle("Foo")
                    .setYear(2025)
                    .build();

                const book2 = new PhysicalBookBuilder()
                    .setISBN(isbn2)
                    .setPrice(10)
                    .setStock(5)
                    .setTitle("Bar")
                    .setYear(2024)
                    .build();

                const book3 = new PhysicalBookBuilder()
                    .setISBN(isbn3)
                    .setPrice(10)
                    .setStock(5)
                    .setTitle("Baz")
                    .setYear(2020)
                    .build();

                const book4 = new PhysicalBookBuilder()
                    .setISBN(isbn4)
                    .setPrice(10)
                    .setStock(5)
                    .setTitle("Qux")
                    .setYear(2019)
                    .build();

                store.addBook(book1);
                store.addBook(book2);
                store.addBook(book3);
                store.addBook(book4);

                store.removeOutdatedBooksBefore(2024);

                assert.strictEqual(store.inventory.size, 2);

                assert(store.inventory.has(isbn1));
                assert(store.inventory.has(isbn2));
                assert(!store.inventory.has(isbn3));
                assert(!store.inventory.has(isbn4));
            });

            it("returns correct paid amount", () => {
                const store = new BookStore();
                const isbn = crypto.randomUUID();

                const quantity = 3;
                const price = 10;

                const book = new PhysicalBookBuilder()
                    .setISBN(isbn)
                    .setPrice(10)
                    .setStock(10)
                    .setTitle("It Happens At Night In A Closed Room")
                    .setYear(2018)
                    .build();

                store.addBook(book);

                const val = store.buyBook(
                    isbn,
                    quantity,
                    "Port Said",
                    "foo@gmail.com",
                );

                assert.strictEqual(val, price * quantity);
            });
        });
    }
}

BookStoreTests.run();
