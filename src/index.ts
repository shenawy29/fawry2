import { PhysicalBookBuilder } from "./book/models/PhysicalBook";
import BookStore from "./bookstore/BookStore";

const store = new BookStore();
const isbn = crypto.randomUUID();

const book = new PhysicalBookBuilder()
    .setISBN(isbn)
    .setPrice(10)
    .setStock(1)
    .setTitle("Land of Zicola")
    .setYear(2010)
    .build();

store.addBook(book);

const quantity = 1;

store.buyBook(
    isbn,
    quantity,
    "Building B143, 2nd Floor Smart Village",
    "foo@fawry.com",
);
