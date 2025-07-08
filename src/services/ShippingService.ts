import Book from "../book/abstract/Book";

export default class ShippingService {
    static send(book: Book, address: string) {
        const reset = "\x1b[0m";
        const cyan = "\x1b[36m";
        const yellow = "\x1b[33m";

        console.log(
            `Sending ${yellow}${book.title}${reset} to ${cyan}${address}${reset}.\n`,
        );
    }
}
