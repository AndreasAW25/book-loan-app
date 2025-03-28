# Aplikasi Peminjaman Buku

Aplikasi peminjaman buku sederhana yang dibangun menggunakan Node.js dan MySQL.

## Fitur

- Manajemen buku (tambah, edit, hapus, lihat)
- Manajemen peminjam (tambah, edit, hapus, lihat)
- Peminjaman buku
- Pengembalian buku
- Riwayat peminjaman

## Persyaratan

- Node.js (v14 atau lebih tinggi)
- MySQL (v5.7 atau lebih tinggi)
- npm atau yarn

## Instalasi

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```
3. Buat file `.env` di root project dan isi dengan konfigurasi database:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=book_loan_db
   PORT=3000
   ```
4. Buat database MySQL dengan nama `book_loan_db`
5. Jalankan aplikasi:
   ```bash
   npm run dev
   ```

## API Endpoints

### Buku
- GET /api/books - Mendapatkan semua buku
- GET /api/books/:id - Mendapatkan detail buku
- POST /api/books - Menambah buku baru
- PUT /api/books/:id - Mengupdate buku
- DELETE /api/books/:id - Menghapus buku

### Peminjam
- GET /api/borrowers - Mendapatkan semua peminjam
- GET /api/borrowers/:id - Mendapatkan detail peminjam
- POST /api/borrowers - Menambah peminjam baru
- PUT /api/borrowers/:id - Mengupdate data peminjam
- DELETE /api/borrowers/:id - Menghapus data peminjam

### Peminjaman
- GET /api/loans - Mendapatkan semua data peminjaman
- POST /api/loans - Membuat peminjaman baru
- PUT /api/loans/:id/return - Mengembalikan buku 