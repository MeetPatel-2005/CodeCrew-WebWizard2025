import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        mongoose.connection.on('connected', () => {
            console.log("✅ MongoDB Connected Successfully");
            console.log(`📚 Database: library_management_db`);
        });
        
        mongoose.connection.on('error', (err) => {
            console.error("❌ MongoDB Connection Error:", err.message);
        });

        mongoose.connection.on('disconnected', () => {
            console.log("⚠️ MongoDB Disconnected");
        });

        await mongoose.connect(process.env.MONGODB_URI);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        console.log("💡 Please check your MongoDB URI and credentials in .env file");
        process.exit(1);
    }
};

export default connectDB;
