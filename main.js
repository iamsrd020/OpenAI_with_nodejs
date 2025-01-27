const express = require('express');
const OpenAI = require("openai");
require('dotenv').config(); // For environment variables
const app = express();
app.use(express.json());

// Initialize OpenAI with the API key from environment variables
const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY, // Use environment variable
});

// Route to get a response
app.get('/getResponse', async (req, res) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', 
            messages: [{ "role": "user", "content": "Essay on Karnataka" }],
            max_tokens: 100,
        });

        res.json(response.data); // Return the response to the client
    } catch (error) {
        // Handle errors, including rate limits
        if (error.code === 'insufficient_quota') {
            res.status(429).json({
                error: "You have exceeded your API quota. Please check your OpenAI account billing details.",
            });
        } else {
            console.error("Error:", error);
            res.status(500).json({ error: "An error occurred. Please try again later." });
        }
    }
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running at PORT 3000 🚀🚀🚀");
});
