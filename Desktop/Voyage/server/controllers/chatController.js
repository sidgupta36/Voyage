import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config({ override: true });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

import fs from 'fs';

export const chat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!process.env.GEMINI_API_KEY) {
            console.error("Error: GEMINI_API_KEY is missing in environment variables.");
            return res.status(500).json({ error: "API Key configuration error" });
        }

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const systemInstruction = "You are a helpful travel assistant. When asked about weather, provide typical weather conditions (temperature, season, rainfall) for the location based on general knowledge. Do NOT apologize for lack of real-time data. Just state the typical conditions clearly and helpfuly.";
        const fullMessage = `${systemInstruction}\n\nUser: ${message}`;

        const result = await model.generateContent(fullMessage);
        const response = await result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error("Error in chat controller:", error);
        fs.writeFileSync('error.log', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
