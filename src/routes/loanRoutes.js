const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Get all loans
router.get('/', loanController.getAllLoans);

// Get loan by ID
router.get('/:id', loanController.getLoanById);

// Create new loan
router.post('/', loanController.createLoan);

// Return book
router.put('/:id/return', loanController.returnBook);

module.exports = router; 