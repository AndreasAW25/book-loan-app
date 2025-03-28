const Loan = require('../models/loanModel');

const loanController = {
  // Get all loans
  getAllLoans: async (req, res) => {
    try {
      const loans = await Loan.getAll();
      res.json({
        status: 'success',
        data: loans
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Get loan by ID
  getLoanById: async (req, res) => {
    try {
      const loan = await Loan.getById(req.params.id);
      if (!loan) {
        return res.status(404).json({
          status: 'error',
          message: 'Data peminjaman tidak ditemukan'
        });
      }
      res.json({
        status: 'success',
        data: loan
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Create new loan
  createLoan: async (req, res) => {
    try {
      const { book_id, borrower_id, loan_date, due_date } = req.body;

      // Validate required fields
      if (!book_id || !borrower_id || !loan_date || !due_date) {
        return res.status(400).json({
          status: 'error',
          message: 'Semua field harus diisi'
        });
      }

      // Validate dates
      const loanDate = new Date(loan_date);
      const dueDate = new Date(due_date);

      if (isNaN(loanDate.getTime()) || isNaN(dueDate.getTime())) {
        return res.status(400).json({
          status: 'error',
          message: 'Format tanggal tidak valid'
        });
      }

      if (dueDate <= loanDate) {
        return res.status(400).json({
          status: 'error',
          message: 'Tanggal pengembalian harus setelah tanggal peminjaman'
        });
      }

      const loanId = await Loan.create(req.body);
      const newLoan = await Loan.getById(loanId);

      res.status(201).json({
        status: 'success',
        data: newLoan
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Return book
  returnBook: async (req, res) => {
    try {
      const success = await Loan.returnBook(req.params.id);
      if (!success) {
        return res.status(404).json({
          status: 'error',
          message: 'Data peminjaman tidak ditemukan atau sudah dikembalikan'
        });
      }

      const updatedLoan = await Loan.getById(req.params.id);
      res.json({
        status: 'success',
        data: updatedLoan,
        message: 'Buku berhasil dikembalikan'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
};

module.exports = loanController; 