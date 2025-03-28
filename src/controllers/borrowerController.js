const Borrower = require('../models/borrowerModel');

const borrowerController = {
  // Get all borrowers
  getAllBorrowers: async (req, res) => {
    try {
      const borrowers = await Borrower.getAll();
      res.json({
        status: 'success',
        data: borrowers
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Get borrower by ID
  getBorrowerById: async (req, res) => {
    try {
      const borrower = await Borrower.getById(req.params.id);
      if (!borrower) {
        return res.status(404).json({
          status: 'error',
          message: 'Peminjam tidak ditemukan'
        });
      }
      res.json({
        status: 'success',
        data: borrower
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Create new borrower
  createBorrower: async (req, res) => {
    try {
      const { name, email, phone, address } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !address) {
        return res.status(400).json({
          status: 'error',
          message: 'Semua field harus diisi'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          status: 'error',
          message: 'Format email tidak valid'
        });
      }

      const borrowerId = await Borrower.create(req.body);
      const newBorrower = await Borrower.getById(borrowerId);

      res.status(201).json({
        status: 'success',
        data: newBorrower
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Update borrower
  updateBorrower: async (req, res) => {
    try {
      const { name, email, phone, address } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !address) {
        return res.status(400).json({
          status: 'error',
          message: 'Semua field harus diisi'
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          status: 'error',
          message: 'Format email tidak valid'
        });
      }

      const success = await Borrower.update(req.params.id, req.body);
      if (!success) {
        return res.status(404).json({
          status: 'error',
          message: 'Peminjam tidak ditemukan'
        });
      }

      const updatedBorrower = await Borrower.getById(req.params.id);
      res.json({
        status: 'success',
        data: updatedBorrower
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  },

  // Delete borrower
  deleteBorrower: async (req, res) => {
    try {
      const success = await Borrower.delete(req.params.id);
      if (!success) {
        return res.status(404).json({
          status: 'error',
          message: 'Peminjam tidak ditemukan'
        });
      }

      res.json({
        status: 'success',
        message: 'Peminjam berhasil dihapus'
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: error.message
      });
    }
  }
};

module.exports = borrowerController; 