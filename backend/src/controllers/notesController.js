// Import the Note model (adjust the relative path as needed based on your project structure)
import Note from '../models/Note.js';

// --------------------------- GET ALL NOTES ---------------------------

// Handle GET requests to fetch all notes
export const Get_All_Notes = async (req, res) => { 
  try {
    // Retrieve all notes from the database, sorted by creation date in descending order (newest first)
    const notes = await Note.find().sort({ createdAt: -1 });

    // Send the retrieved notes back to the client with status 200 (OK)
    res.status(200).json(notes);
  } catch (error) {
    // Log the error to the console for debugging
    console.error("Error fetching notes:", error);

    // Respond with status 500 (Internal Server Error) and an error message
    res.status(500).json({ message: "Error fetching notes" });
  }
};

// --------------------------- GET A SINGLE NOTE ---------------------------

export const Get_A_Unique_Note = async (req, res) => {
  try {
    // Find a note by its ID, provided via request parameters
    const note = await Note.findById(req.params.id);

    // If the note doesn't exist, return a 404 (Not Found) response
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    // If found, return the note with status 200 (OK)
    res.status(200).json(note);
  } catch (error) {
    // Log any error that occurs while trying to fetch the note
    console.error("Error fetching note:", error);

    // Respond with status 500 and an appropriate error message
    res.status(500).json({ message: "Error fetching note" });
  }
};

// --------------------------- CREATE A NEW NOTE ---------------------------

// Handle POST requests to create a new note
export const Create_New_Note = async (req, res) => {
  try {
    // Extract title and content from the request body
    const { title, content } = req.body;

    // Create a new Note instance with the provided title and content
    const note = new Note({ title, content });

    // Save the note to the database
    const savedNote = await note.save();

    // Respond with the saved note and status 201 (Created)
    res.status(201).json(savedNote);
  } catch (error) {
    // Log the error if note creation fails
    console.error("Error creating note:", error);

    // Respond with status 500 and an error message
    res.status(500).json({ message: "Error creating note" });
  }
};

// --------------------------- UPDATE AN EXISTING NOTE ---------------------------

// Handle PUT requests to update an existing note by ID
export const Update_Existing_Note = async (req, res) => {
  try {
    // Extract title and content from the request body
    const { title, content } = req.body;

    // Find the note by its ID and update it with the new values
    // The { new: true } option returns the updated document
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    // If no note was found to update, respond with 404
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Respond with the updated note and status 200 (OK)
    res.status(200).json(updatedNote);
  } catch (error) {
    // Log any errors during update
    console.error("Error updating note:", error);

    // Respond with 500 and error message
    res.status(500).json({ message: "Error updating note" });
  }
};

// --------------------------- DELETE A NOTE ---------------------------

// Handle DELETE requests to remove a note by ID
export const Delete_Existing_Note = async (req, res) => {
  try {
    // Attempt to delete the note with the provided ID
    const deletedNote = await Note.findByIdAndDelete(req.params.id);

    // If the note was not found, return a 404 error
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Respond with a success message and status 200 (OK)
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    // Log the error to the console
    console.error("Error deleting note:", error);

    // Respond with 500 and error message
    res.status(500).json({ message: "Error deleting note" });
  }
};
