const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/lists', require('./src/routes/listRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
