import './styles/app.css';
import './styles/bootstrap.css';
import UI from './UI';

document.getElementById('book-form').addEventListener('submit', e => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;
    const img = document.getElementById('image').files;

    const formData = new FormData();
    formData.append('image', img[0]);
    formData.append('title', title);
    formData.append('author', author);
    formData.append('isbn', isbn);

    const ui = new UI();
    ui.addNewBook(formData);

    ui.renderMessage('New book added', 'success', 3000);

    e.preventDefault();
});

document.getElementById('books-cards').addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        const ui = new UI();
        ui.deleteBook(e.target.getAttribute('_id'));
        ui.renderMessage('Book Removed', 'danger', 3000);
    }

    e.preventDefault();
});
