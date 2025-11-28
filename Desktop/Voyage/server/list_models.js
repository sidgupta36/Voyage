import dotenv from 'dotenv';
dotenv.config({ override: true });

async function main() {
    try {
        const key = process.env.GEMINI_API_KEY;
        if (!key) {
            console.error("No API Key found");
            return;
        }
        console.log("Using key:", key.substring(0, 5) + "...");
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();
        console.log(JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(error);
    }
}

main();
