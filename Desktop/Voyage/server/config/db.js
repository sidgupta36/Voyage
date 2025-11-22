import mongoose from "mongoose";

const DataBase = async () => {
    try {
        console.log("MongoDB URI from env:", process.env.MONGO);

        if (!process.env.MONGO) {
            console.error("❌ MONGO env variable is not set");
            return;
        }

        await mongoose.connect(process.env.MONGO, {
            // If you want a specific DB, uncomment next line:
            // dbName: "tripinfo",
        });

        console.log("✅ Database connection successful");
    } catch (error) {
        console.error("❌ Database failed to connect:\n", error);
    }
};

export default DataBase;
