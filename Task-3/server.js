const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { id: 2, title: '1984', author: 'George Orwell' }
];

app.use(express.static('public'));

app.get('/books', (req, res) => {
    res.json(books);
});

app.post('/books', (req, res) => {
    if (!req.body.title || !req.body.author) {
        return res.status(400).json({ message: 'Title and Author are required' });
    }

    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

app.put('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex !== -1) {
        books[bookIndex] = {
            ...books[bookIndex],
            title: req.body.title || books[bookIndex].title,
            author: req.body.author || books[bookIndex].author
        };
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === id);

    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.json({ message: 'Book deleted successfully', book: deletedBook[0] });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
