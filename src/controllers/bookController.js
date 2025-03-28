const Book = require('../models/bookModel');

const bookController = {
  // Get all books
  getAllBooks: async (req, res) => {
    try {
      const books = await Book.getAll();
      res.json({
        status: 'success',
        data: books
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Get book by ID
  getBookById: async (req, res) => {
    try {
      const book = await Book.getById(req.params.id);
      if (!book) {
        return res.status(404).json({
          status: 'error',
          message: 'Buku tidak ditemukan'
        });
      }
      res.json({
        status: 'success',
        data: book
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Create new book
  createBook: async (req, res) => {
    try {
      const { title, author, isbn, quantity } = req.body;

      // Validate required fields
      if (!title || !author || !isbn || quantity === undefined) {
        return res.status(400).json({
          status: 'error',
          message: 'Semua field harus diisi'
        });
      }

      const bookId = await Book.create(req.body);
      const newBook = await Book.getById(bookId);

      res.status(201).json({
        status: 'success',
        data: newBook
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Update book
  updateBook: async (req, res) => {
    try {
      const { title, author, isbn, quantity } = req.body;

      // Validate required fields
      if (!title || !author || !isbn || quantity === undefined) {
        return res.status(400).json({
          status: 'error',
          message: 'Semua field harus diisi'
        });
      }

      const success = await Book.update(req.params.id, req.body);
      if (!success) {
        return res.status(404).json({
          status: 'error',
          message: 'Buku tidak ditemukan'
        });
      }

      const updatedBook = await Book.getById(req.params.id);
      res.json({
        status: 'success',
        data: updatedBook
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Delete book
  deleteBook: async (req, res) => {
    try {
      const success = await Book.delete(req.params.id);
      if (!success) {
        return res.status(404).json({
          status: 'error',
          message: 'Buku tidak ditemukan'
        });
      }

      res.json({
        status: 'success',
        message: 'Buku berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
};

module.exports = bookController; 