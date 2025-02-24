// Import express
import express from 'express';

// Import cors
import cors from 'cors';

// Import routes
import Router from './routes/productRouter.js';

// Initialize express
const app = express();

// Use express json middleware to parse JSON requests
app.use(express.json());

// Use cors middleware to enable Cross-Origin Resource Sharing
app.use(cors());

// Use router for handling API routes
app.use('/api', Router);

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server and listen on the defined PORT
app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
