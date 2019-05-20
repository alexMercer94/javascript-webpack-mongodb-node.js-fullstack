class BookService {
    constructor() {
        this.URI = 'http://localhost:3000/api/books';
    }

    /**
     * Get all books from Service
     */
    async getBooks() {
        const response = await fetch(this.URI);
        const books = await response.json();
        return books;
    }

    /**
     * Send a book to backend in order to save it in database
     * @param {*} book Book to save in databse
     */
    async postBook(book) {
        const response = await fetch(this.URI, {
            method: 'POST',
            body: book
        });

        const data = await response.json();
        console.log(data);
    }

    /**
     * Consult backend in order to delete a book
     * @param {*} bookId Book's Id to delete
     */
    async deleteBook(bookId) {
        const response = await fetch(`${this.URI}/${bookId}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        });

        await response.json();
    }
}

module.exports = BookService;
