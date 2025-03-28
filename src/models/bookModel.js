const db = require('../config/database');

class Book {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM books');
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(bookData) {
    const { title, author, isbn, quantity } = bookData;
    const [result] = await db.query(
      'INSERT INTO books (title, author, isbn, quantity) VALUES (?, ?, ?, ?)',
      [title, author, isbn, quantity]
    );
    return result.insertId;
  }

  static async update(id, bookData) {
    const { title, author, isbn, quantity } = bookData;
    const [result] = await db.query(
      'UPDATE books SET title = ?, author = ?, isbn = ?, quantity = ? WHERE id = ?',
      [title, author, isbn, quantity, id]
    );
    return result.affectedRows > 0;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM books WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}

module.exports = Book; 