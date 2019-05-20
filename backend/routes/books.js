const { Router } = require('express');
const router = Router();
const { unlink } = require('fs-extra');
const path = require('path');

const Book = require('../models/Book');

// --Define Server routes
/**
 * Route in order to get books
 */
router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

/**
 * Route in order to save a new Book
 */
router.post('/', async (req, res) => {
    const { title, author, isbn } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newBook = new Book({ title, author, isbn, imagePath });
    await newBook.save();
    res.json({ message: 'Book saved' });
});

/**
 * Route in order to delete a Book
 */
router.delete('/:id', async (req, res) => {
    const book = await Book.findByIdAndDelete(req.param.id);
    unlinkSync(path.resolve('./backend/public' + book.imagePath));
    res.json({ message: 'Book deleted' });
});

module.exports = router;
