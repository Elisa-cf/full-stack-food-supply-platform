import db from '../config/database.js';

// Get all products
export const getProducts = async result => {
  try {
    const [results] = await db.query('SELECT * FROM product');
    result(null, results);
  } catch (err) {
    result(err, null);
  }
};

// Get single product by ID
export const getProductById = async (id, result) => {
  try {
    const [results] = await db.query(
      'SELECT * FROM product WHERE product_id = ?',
      [id]
    );
    result(null, results[0]);
  } catch (err) {
    result(err, null);
  }
};

// Insert product into database
export const insertProduct = async (data, result) => {
  try {
    const [results] = await db.query('INSERT INTO product SET ?', [data]);
    result(null, results);
  } catch (err) {
    result(err, null);
  }
};

// Update product in database
export const updateProductById = async (data, id, result) => {
  try {
    const [results] = await db.query(
      'UPDATE product SET product_name = ?, product_price = ? WHERE product_id = ?',
      [data.product_name, data.product_price, id]
    );
    result(null, results);
  } catch (err) {
    result(err, null);
  }
};

// Delete product from database
export const deleteProductById = async (id, result) => {
  try {
    const [results] = await db.query(
      'DELETE FROM product WHERE product_id = ?',
      [id]
    );
    result(null, results);
  } catch (err) {
    result(err, null);
  }
};
