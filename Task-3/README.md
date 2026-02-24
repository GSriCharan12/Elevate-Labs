# Book Manager API (Task-3)

A simple REST API to manage a list of books, built with Node.js and Express. This project includes a modern, responsive frontend implementation to interact with the API.

## 🚀 Features

- **REST API Endpoints**:
  - `GET /books`: Retrieve all books
  - `POST /books`: Add a new book
  - `PUT /books/:id`: Update an existing book
  - `DELETE /books/:id`: Remove a book
- **Frontend Interface**:
  - Clean, modern UI with hover effects
  - Responsive design
  - Real-time updates without page reload (AJAX/Fetch)
  - Toast notifications for actions

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Data Storage**: In-memory array (non-persistent)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/GSriCharan12/Elevate-Labs.git
   cd Elevate-Labs/Task-3
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Server**:
   ```bash
   node server.js
   ```

4. **Access the App**:
   Open functionality in your browser at: `http://localhost:3001`

## 📝 API Usage

| Method | Endpoint | Body (JSON) | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/books` | - | Get all books |
| **POST** | `/books` | `{ "title": "Name", "author": "Author" }` | Add a book |
| **PUT** | `/books/:id` | `{ "title": "New Name" }` | Update book |
| **DELETE**| `/books/:id` | - | Delete book |

## 📂 Project Structure

```
Task-3/
├── public/          # Frontend static files
│   ├── index.html   # User Interface
│   ├── style.css    # Styles and Animations
│   └── script.js    # Client-side Logic
├── node_modules/    # Dependencies
├── package.json     # Project metadata
├── server.js        # Express Server & API Routes
└── README.md        # Documentation
```
