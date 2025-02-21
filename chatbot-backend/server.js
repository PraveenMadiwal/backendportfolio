const cors = require('cors');
const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');

dotenv.config();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both frontend URLs
    methods: 'GET,POST',
    credentials: true,
};


app.use(cors(corsOptions));
app.use(cors()); // Allow requests from any origin

// ✅ Routes
const chatbotRoutes = require('./routes/chatbotRoutes');
app.use('/api/chatbot', chatbotRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
app.use((req, res, next) => {
    console.log(`📢 Incoming request: ${req.method} ${req.url}`);
    next();
});


app.post('/api/chatbot/message', (req, res) => {
    console.log('Received request:', req.body);
    res.json({ botResponse: "Test response from server!" });
});
app.get('/', (req, res) => {
    res.send('Server is working!');
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
