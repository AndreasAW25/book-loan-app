const db = require('../config/database');

class Loan {
  static async getAll() {
    const [rows] = await db.query(`
      SELECT l.*, b.title as book_title, br.name as borrower_name 
      FROM loans l 
      JOIN books b ON l.book_id = b.id 
      JOIN borrowers br ON l.borrower_id = br.id
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query(`
      SELECT l.*, b.title as book_title, br.name as borrower_name 
      FROM loans l 
      JOIN books b ON l.book_id = b.id 
      JOIN borrowers br ON l.borrower_id = br.id 
      WHERE l.id = ?
    `, [id]);
    return rows[0];
  }

  static async create(loanData) {
    const { book_id, borrower_id, loan_date, due_date } = loanData;
    
    // Start transaction
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Check if book is available
      const [book] = await connection.query(
        'SELECT quantity FROM books WHERE id = ? FOR UPDATE',
        [book_id]
      );

      if (book[0].quantity <= 0) {
        throw new Error('Buku tidak tersedia');
      }

      // Create loan
      const [result] = await connection.query(
        'INSERT INTO loans (book_id, borrower_id, loan_date, due_date) VALUES (?, ?, ?, ?)',
        [book_id, borrower_id, loan_date, due_date]
      );

      // Update book quantity
      await connection.query(
        'UPDATE books SET quantity = quantity - 1 WHERE id = ?',
        [book_id]
      );

      await connection.commit();
      return result.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async returnBook(id) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();

      // Get loan details
      const [loan] = await connection.query(
        'SELECT book_id FROM loans WHERE id = ? AND return_date IS NULL',
        [id]
      );

      if (!loan[0]) {
        throw new Error('Peminjaman tidak ditemukan atau sudah dikembalikan');
      }

      // Update loan return date
      await connection.query(
        'UPDATE loans SET return_date = CURRENT_DATE WHERE id = ?',
        [id]
      );

      // Update book quantity
      await connection.query(
        'UPDATE books SET quantity = quantity + 1 WHERE id = ?',
        [loan[0].book_id]
      );

      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = Loan; 