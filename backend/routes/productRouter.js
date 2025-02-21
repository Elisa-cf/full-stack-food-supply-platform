// Import express
import express from 'express';

// Import functions from controller
import {
  showProducts,
  showProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productControllers.js';

// Initialize express router
const router = express.Router();

// Get all products
router.get('/products', showProducts);

// Get single product by ID
router.get('/products/:id', showProductById);

// Create new product
router.post('/products', createProduct);

// Update product by ID
router.put('/products/:id', updateProduct);

// Delete product by ID
router.delete('/products/:id', deleteProduct);

// Export default router
export default router;
