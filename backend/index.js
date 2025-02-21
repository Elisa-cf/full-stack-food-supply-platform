//import express
import express from 'express';

//import cors
import cors from 'cors';

//import routes
import Router from './routes/productRouter.js';

//init express
const app = express();

//use express json
app.use(express.json());

//use cors
app.use(cors());

// Use router
app.use('/api', Router);

// Define the PORT
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running successfully on port ${PORT}`);
});
