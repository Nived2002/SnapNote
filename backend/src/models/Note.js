import mongoose from "mongoose";

// 1. Define the schema for the "Note" model
//    This schema specifies the structure and rules for documents in the "notes" collection.
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,       // The "title" field must be a string
      required: true,     // The "title" field is required (cannot be empty)
    },
    content: {
      type: String,       // The "content" field must be a string
      required: true,     // The "content" field is required
    },
  },
  {
    timestamps: true     // Automatically adds "createdAt" and "updatedAt" fields to each document
  }
);

// 2. Create the model from the schema
//    The model provides an interface to interact with the "notes" collection in MongoDB.
//    "Note" is the model name; Mongoose will create/use the "notes" collection in the database.
const Note = mongoose.model("Note", noteSchema);

// 3. Export the model to use it in other parts of the application (e.g., controllers, routes)
export default Note;
