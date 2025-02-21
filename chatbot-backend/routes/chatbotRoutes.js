const express = require("express");
const { sendMessage } = require("../controllers/chatbotController");

const router = express.Router();

// Fix: Ensure sendMessage is correctly imported
if (!sendMessage) {
  throw new Error("sendMessage function is undefined. Check chatbotController.js");
}

router.post("/message", sendMessage);

module.exports = router;
