import mysql from 'mysql2/promise';

// create the connection to database
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'product_db',
});

export default db;
