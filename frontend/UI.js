import BookService from './services/BookService';
const bookService = new BookService();

import { format } from 'timeago.js';

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderBooks();
});

class UI {
    /**
     * Show all book in Interface
     */
    async renderBooks() {
        const books = await bookService.getBooks();
        const booksCardsContainer = document.getElementById('books-cards');
        booksCardsContainer.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="http://localhost:3000${book.imagePath}" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}<h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCardsContainer.appendChild(div);
        });
    }

    /**
     * Consults API to save a book
     * @param {*} book Book to save in database
     */
    async addNewBook(book) {
        await bookService.postBook(book);
        this.clearForm();
        this.renderBooks();
    }

    /**
     * Clean form after save a book
     */
    clearForm() {
        document.getElementById('book-form').reset();
    }

    /**
     * Show a meesage in the Interface
     */
    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message));

        const conatiner = document.querySelector('.col-md-4');
        const bookForm = document.querySelector('#book-form');

        conatiner.insertBefore(div, bookForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        }, secondsToRemove);
    }

    /**
     * Delete a book from Interface
     */
    async deleteBook(bookId) {
        await bookService.deleteBook(bookId);
        this.renderBooks();
    }
}

export default UI;
