// Import functions from Product model
import {
  getProducts,
  getProductById,
  insertProduct,
  updateProductById,
  deleteProductById,
} from '../models/ProductModel.js';

// Get all products
export const showProducts = async (req, res) => {
  try {
    // Call the getProducts function from the model to retrieve all products
    const results = await getProducts();
    // Send the results as a JSON response
    res.json(results);
  } catch (err) {
    // Send an error response if the query fails
    res.status(500).json({ error: err.message });
  }
};

// Get single product
export const showProductById = async (req, res) => {
  try {
    // Call the getProductById function from the model to retrieve a product by its ID
    const results = await getProductById(req.params.id);
    // Send the results as a JSON response
    res.json(results);
  } catch (err) {
    // Send an error response if the query fails
    res.status(500).json({ error: err.message });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  // Get the product data from the request body
  const data = req.body;
  try {
    // Call the insertProduct function from the model to insert a new product
    const results = await insertProduct(data);
    // Send the results as a JSON response
    res.json(results);
  } catch (err) {
    // Send an error response if the query fails
    res.status(500).json({ error: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  // Get the product data from the request body
  const data = req.body;
  // Get the product ID from the request parameters
  const id = req.params.id;
  try {
    // Call the updateProductById function from the model to update the product
    const results = await updateProductById(data, id);
    // Send the results as a JSON response
    res.json(results);
  } catch (err) {
    // Send an error response if the query fails
    res.status(500).json({ error: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  // Get the product ID from the request parameters
  const id = req.params.id;
  try {
    // Call the deleteProductById function from the model to delete the product
    const results = await deleteProductById(id);
    // Send the results as a JSON response
    res.json(results);
  } catch (err) {
    // Send an error response if the query fails
    res.status(500).json({ error: err.message });
  }
};
