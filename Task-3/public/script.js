document.addEventListener('DOMContentLoaded', () => {
    // --- State and UI Elements ---
    const bookForm = document.getElementById('book-form');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const bookIdInput = document.getElementById('book-id');
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const booksGrid = document.getElementById('books-grid');
    const emptyState = document.getElementById('empty-state');
    const bookCount = document.getElementById('book-count');
    const toast = document.getElementById('toast');
    const API_URL = '/books';

    // --- Helper Functions ---

    // Show Notification Toast
    function showToast(message, type = 'success') {
        const toastMessage = document.getElementById('toast-message');
        toastMessage.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // Reset Form to Default (Add Mode)
    function resetForm() {
        bookIdInput.value = '';
        titleInput.value = '';
        authorInput.value = '';
        formTitle.textContent = 'Add New Book';
        submitBtn.innerHTML = '<i class="fas fa-plus"></i> Add Book';
        cancelBtn.style.display = 'none';
        bookForm.classList.remove('editing');
    }

    // Create a Book Card Element
    function createBookCard(book) {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.dataset.id = book.id;

        card.innerHTML = `
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author"><i class="fas fa-pen-nib"></i> ${book.author}</p>
            </div>
            <div class="book-actions">
                <button class="edit-btn" onclick="editBook(${book.id}, '${book.title.replace(/'/g, "\\'")}', '${book.author.replace(/'/g, "\\'")}')">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" onclick="deleteBook(${book.id})">
                    <i class="fas fa-trash-alt"></i> Delete
                </button>
            </div>
        `;
        return card;
    }

    // Update UI with Book List
    function renderBooks(books) {
        booksGrid.innerHTML = '';
        bookCount.textContent = `${books.length} Books`;

        if (books.length === 0) {
            emptyState.style.display = 'block';
            booksGrid.style.display = 'none';
        } else {
            emptyState.style.display = 'none';
            booksGrid.style.display = 'grid';
            books.forEach(book => {
                booksGrid.appendChild(createBookCard(book));
            });
        }
    }

    // --- API Interactions ---

    // Fetch All Books (READ)
    async function fetchBooks() {
        try {
            const response = await fetch(API_URL);
            const books = await response.json();
            renderBooks(books);
        } catch (error) {
            console.error('Error fetching books:', error);
            showToast('Failed to load books', 'error');
        }
    }

    // Add New Book (CREATE)
    async function addBook(bookData) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });

            if (response.ok) {
                showToast('Book added successfully!');
                fetchBooks();
                resetForm();
            } else {
                throw new Error('Failed to add book');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    // Update Existing Book (UPDATE)
    async function updateBook(id, bookData) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });

            if (response.ok) {
                showToast('Book updated successfully!');
                fetchBooks();
                resetForm();
            } else {
                throw new Error('Failed to update book');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    }

    // Delete Book (DELETE)
    window.deleteBook = async function (id) {
        if (!confirm('Are you sure you want to delete this book?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

            if (response.ok) {
                showToast('Book deleted successfully!');
                const card = document.querySelector(`.book-card[data-id="${id}"]`);
                if (card) {
                    card.style.transform = 'scale(0.9) opacity(0)';
                    setTimeout(() => fetchBooks(), 300); // Wait for animation
                } else {
                    fetchBooks();
                }
            } else {
                throw new Error('Failed to delete book');
            }
        } catch (error) {
            showToast(error.message, 'error');
        }
    };

    // Populate Form for Editing
    window.editBook = function (id, title, author) {
        bookIdInput.value = id;
        titleInput.value = title;
        authorInput.value = author;

        formTitle.textContent = 'Edit Book';
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Book';
        cancelBtn.style.display = 'block';

        window.scrollTo({ top: 0, behavior: 'smooth' });
        titleInput.focus();
    };

    // --- Event Listeners ---

    bookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const bookData = {
            title: titleInput.value,
            author: authorInput.value
        };

        const id = bookIdInput.value;

        if (id) {
            updateBook(id, bookData);
        } else {
            addBook(bookData);
        }
    });

    cancelBtn.addEventListener('click', () => {
        resetForm();
    });

    // Initial Load
    fetchBooks();
});
