import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyAg8SxN_O0pvXQyGS1aweubtoo-WHz6bBE";

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            const geminiModels = data.models
                .filter(m => m.name.includes("gemini"))
                .map(m => m.name);
            console.log("Gemini Models:", geminiModels);
        } else {
            console.log("No models found or error:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
