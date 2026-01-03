import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_CONNECTION_STRING;
        if (!connectionString) {
            throw new Error("MONGODB_CONNECTION_STRING is not defined in environment variables");
        }
        await mongoose.connect(connectionString);
        console.log("connected to MongoDB successfully");
    } catch (error) {
        console.log("error connecting to MongoDB", error);
        process.exit(1);
    }
}