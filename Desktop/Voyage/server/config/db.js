import mongoose from "mongoose";


const DataBase = async () => {
    console.log(process.env.MONGO);

    try {
        const mongoUri = process.env.MONGO.endsWith('/')
            ? process.env.MONGO + 'tripinfo'
            : process.env.MONGO + '/tripinfo';
        const connection = await mongoose.connect(mongoUri)
        console.log("Database connection successfull");
    } catch (error) {
        console.log("Data base failed to connect : ", error);

    }
}

export default DataBase