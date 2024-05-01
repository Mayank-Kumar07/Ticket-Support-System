const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
const Ticket = require('./models/Ticket');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/api/tickets', ticketRoutes);

// Authentication route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Validate username and password (e.g., check against database)
  if (username === 'admin' && password === 'password') {
    // Generate JWT token
    const token = jwt.sign({ username }, 'secretKey', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected route example (requires authentication)
app.get('/api/user', authMiddleware, (req, res) => {
  res.json({ username: req.user.username });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

