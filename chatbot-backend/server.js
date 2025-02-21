const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Fix CORS issue
const corsOptions = {
    origin: 'http://localhost:5173', // Allow React frontend
    methods: 'GET,POST',
    credentials: true,
};

app.use(cors(corsOptions));

// ✅ Routes
const chatbotRoutes = require('./routes/chatbotRoutes');
app.use('/api/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
