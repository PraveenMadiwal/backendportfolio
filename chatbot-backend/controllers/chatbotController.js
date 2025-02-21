const db = require('../config/db');

// 📌 Fetch bot response from the database (case-insensitive)
const getBotResponse = (message, callback) => {
    const sql = "SELECT bot_answer FROM bot_responses WHERE LOWER(user_question) = LOWER(?) LIMIT 1";
    db.query(sql, [message.toLowerCase()], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return callback(err, null);
        }
        if (results.length > 0) {
            console.log("Bot response found:", results[0].bot_answer);
            callback(null, results[0].bot_answer);
        } else {
            console.log("No response found for:", message);
            callback(null, "I'm not sure, but I'm learning!");
        }
    });
};

// 📌 Handle user messages and fetch bot responses
exports.sendMessage = (req, res) => {
    const { message } = req.body;

    getBotResponse(message, (err, botResponse) => {
        if (err) return res.status(500).json({ error: 'Database error' });

        // Store user message and bot response in `messages` table
        const sql = "INSERT INTO messages (user_message, bot_reply) VALUES (?, ?)";
        db.query(sql, [message, botResponse], (insertErr) => {
            if (insertErr) return res.status(500).json({ error: 'Database error' });
            res.json({ botResponse });
        });
    });
};

// 📌 Fetch all stored messages
exports.getAllMessages = (req, res) => {
    db.query("SELECT * FROM messages ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        res.json(results);
    });
};
