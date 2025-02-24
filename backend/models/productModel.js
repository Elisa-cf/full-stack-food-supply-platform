import db from '../config/database.js';

// Get all products
export const getProducts = async () => {
  try {
    const [results] = await db.query('SELECT * FROM product');
    return results;
  } catch (err) {
    throw new Error('Failed to fetch products');
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
export const insertProduct = async data => {
  try {
    const [results] = await db.query('INSERT INTO product SET ?', [data]);
    return results;
  } catch (err) {
    throw new Error('Failed to insert product');
  }
};

// Update product in database
export const updateProductById = async (data, id, result) => {
  try {
    const [results] = await db.query(
      'UPDATE product SET product_name = ?, product_price = ? WHERE product_id = ?',
      [data.product_name, data.product_price, id]
    );
    return results;
  } catch (err) {
    result(err, null);
  }
};

// Delete product from database
export const deleteProductById = async id => {
  try {
    const [results] = await db.query(
      'DELETE FROM product WHERE product_id = ?',
      [id]
    );
    return results;
  } catch (err) {
    throw new Error('Failed to delete product');
  }
};
