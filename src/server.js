const express = require('express');
const cors = require('cors');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const bookRoutes = require('./routes/bookRoutes');
const borrowerRoutes = require('./routes/borrowerRoutes');
const loanRoutes = require('./routes/loanRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// API Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrowers', borrowerRoutes);
app.use('/api/loans', loanRoutes);

// View Routes
app.use('/', dashboardRoutes);
app.use('/dashboard', dashboardRoutes);

// Books View
app.get('/books', async (req, res) => {
    try {
        const books = await require('./models/bookModel').getAll();
        res.render('books', { books });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).render('error', { message: 'Terjadi kesalahan saat memuat data buku' });
    }
});

// Borrowers View
app.get('/borrowers', async (req, res) => {
    try {
        const borrowers = await require('./models/borrowerModel').getAll();
        res.render('borrowers', { borrowers });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).render('error', { message: 'Terjadi kesalahan saat memuat data peminjam' });
    }
});

// Loans View
app.get('/loans', async (req, res) => {
    try {
        const loans = await require('./models/loanModel').getAll();
        const books = await require('./models/bookModel').getAll();
        const borrowers = await require('./models/borrowerModel').getAll();
        res.render('loans', { loans, books, borrowers });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).render('error', { message: 'Terjadi kesalahan saat memuat data peminjaman' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan pada server'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
}); 