// Import mongoose to interact with MongoDB
import mongoose from "mongoose";

// Async function to connect to MongoDB
export const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using the URI from environment variables
    await mongoose.connect(process.env.MONGO_URI);  // Ensure .env has MONGO_URI defined

    // If connection is successful, log the success message
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    // If an error occurs, log the error and exit the process with failure code
    console.error("Error connecting to MONGODB", error);

    // Exit the process to avoid running the app without a DB connection
    process.exit(1);
  }
};
