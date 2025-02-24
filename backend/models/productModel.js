// Import the database configuration
import db from '../config/database.js';

// Get all products from the database
export const getProducts = async () => {
  try {
    // Execute the SQL query to select all products
    const [results] = await db.query('SELECT * FROM product');
    // Return the results
    return results;
  } catch (err) {
    // Throw an error if the query fails
    throw new Error('Failed to fetch products');
  }
};

// Get a single product by ID from the database
export const getProductById = async (id, result) => {
  try {
    // Execute the SQL query to select a product by its ID
    const [results] = await db.query(
      'SELECT * FROM product WHERE product_id = ?',
      [id]
    );
    // Return the first result (the product) through the callback
    result(null, results[0]);
  } catch (err) {
    // Return an error through the callback if the query fails
    result(err, null);
  }
};

// Insert a new product into the database
export const insertProduct = async data => {
  try {
    // Execute the SQL query to insert a new product
    const [results] = await db.query('INSERT INTO product SET ?', [data]);
    // Return the results
    return results;
  } catch (err) {
    // Throw an error if the query fails
    throw new Error('Failed to insert product');
  }
};

// Update a product in the database by its ID
export const updateProductById = async (data, id, result) => {
  try {
    // Execute the SQL query to update a product by its ID
    const [results] = await db.query(
      'UPDATE product SET product_name = ?, product_price = ? WHERE product_id = ?',
      [data.product_name, data.product_price, id]
    );
    // Return the results
    return results;
  } catch (err) {
    // Return an error through the callback if the query fails
    result(err, null);
  }
};

// Delete a product from the database by its ID
export const deleteProductById = async id => {
  try {
    // Execute the SQL query to delete a product by its ID
    const [results] = await db.query(
      'DELETE FROM product WHERE product_id = ?',
      [id]
    );
    // Return the results
    return results;
  } catch (err) {
    // Throw an error if the query fails
    throw new Error('Failed to delete product');
  }
};
