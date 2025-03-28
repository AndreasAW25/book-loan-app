-- Create database
CREATE DATABASE IF NOT EXISTS book_loan_db;
USE book_loan_db;

-- Create books table
CREATE TABLE IF NOT EXISTS books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    isbn VARCHAR(13) NOT NULL UNIQUE,
    quantity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create borrowers table
CREATE TABLE IF NOT EXISTS borrowers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create loans table
CREATE TABLE IF NOT EXISTS loans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT NOT NULL,
    borrower_id INT NOT NULL,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (borrower_id) REFERENCES borrowers(id)
);

-- Insert sample data
INSERT INTO books (title, author, isbn, quantity) VALUES
('Harry Potter and the Philosopher\'s Stone', 'J.K. Rowling', '9780747532699', 5),
('The Hobbit', 'J.R.R. Tolkien', '9780547928227', 3),
('1984', 'George Orwell', '9780451524935', 2);

INSERT INTO borrowers (name, email, phone, address) VALUES
('John Doe', 'john@example.com', '081234567890', 'Jl. Contoh No. 1'),
('Jane Smith', 'jane@example.com', '081234567891', 'Jl. Contoh No. 2'),
('Bob Johnson', 'bob@example.com', '081234567892', 'Jl. Contoh No. 3'); 