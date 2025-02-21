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
    const results = await getProducts();
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single product
export const showProductById = async (req, res) => {
  try {
    const results = await getProductById(req.params.id);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new product
export const createProduct = async (req, res) => {
  const data = req.body;
  try {
    const results = await insertProduct(data);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    const results = await updateProductById(data, id);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete product
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const results = await deleteProductById(id);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
