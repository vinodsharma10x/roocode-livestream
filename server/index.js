const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/star-journal', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'STAR Programmer Journal API' });
});

// Journal entries routes
app.use('/api/entries', require('./routes/entries'));

// Templates routes
app.use('/api/templates', require('./routes/templates'));

// Tags routes
app.use('/api/tags', require('./routes/tags'));

// Search routes
app.use('/api/search', require('./routes/search'));

// Suggestions routes (intelligent hints)
app.use('/api/suggestions', require('./routes/suggestions'));

// Auth routes
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});