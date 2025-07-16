// Import the Express framework to create the server
import express from "express";

import cors from "cors";
// Import the routes for notes-related API endpoints
import notesRoutes from "./routes/notesRoutes.js";

// Import the function to connect to MongoDB
import { connectDB } from "./config/db.js";

// Load environment variables from a .env file
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
// Initialize dotenv configuration
dotenv.config();

// Create an Express application instance
const app = express();

// Connect to MongoDB using the imported function

// Define the port to run the server on (from .env or fallback to 5001)
const PORT = process.env.PORT || 5001;

// Middleware to parse incoming JSON requests
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from this origin (frontend)
}))

app.use(express.json()); // Allows Express to read JSON bodies (important for POST/PUT)

app.use(rateLimiter);
// Mount the notes routes on the /api/notes path
app.use("/api/notes", notesRoutes); // Example route: GET /api/notes/

// Start the server and listen on the defined port
connectDB().then(() =>{
  app.listen(PORT, () => {
    console.log("Server started on PORT", PORT);
  })
});
