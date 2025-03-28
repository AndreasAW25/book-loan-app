const Book = require('../models/bookModel');
const Borrower = require('../models/borrowerModel');
const Loan = require('../models/loanModel');

const dashboardController = {
    getDashboard: async (req, res) => {
        try {
            // Get total books
            const books = await Book.getAll();
            const totalBooks = books.length;

            // Get total borrowers
            const borrowers = await Borrower.getAll();
            const totalBorrowers = borrowers.length;

            // Get active loans
            const loans = await Loan.getAll();
            const activeLoans = loans.filter(loan => !loan.return_date).length;

            // Get recent loans (last 5)
            const recentLoans = loans
                .sort((a, b) => new Date(b.loan_date) - new Date(a.loan_date))
                .slice(0, 5);

            // Get popular books (sorted by quantity)
            const popularBooks = books
                .sort((a, b) => b.quantity - a.quantity)
                .slice(0, 5);

            res.render('dashboard', {
                totalBooks,
                totalBorrowers,
                activeLoans,
                recentLoans,
                popularBooks
            });
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            res.status(500).render('error', {
                message: 'Terjadi kesalahan saat memuat data dashboard'
            });
        }
    }
};

module.exports = dashboardController; 