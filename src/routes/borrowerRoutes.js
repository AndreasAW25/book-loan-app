const express = require('express');
const router = express.Router();
const borrowerController = require('../controllers/borrowerController');

// Get all borrowers
router.get('/', borrowerController.getAllBorrowers);

// Get borrower by ID
router.get('/:id', borrowerController.getBorrowerById);

// Create new borrower
router.post('/', borrowerController.createBorrower);

// Update borrower
router.put('/:id', borrowerController.updateBorrower);

// Delete borrower
router.delete('/:id', borrowerController.deleteBorrower);

module.exports = router; 