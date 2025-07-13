// Import React's useState hook to manage component state
import { useState } from 'react';

// Import useEffect to handle side effects (like fetching data on mount)
import { useEffect } from 'react';
// Import the NotesNotFound component to display when no notes are found
import NotesNotFound from '../components/NotesNotFound';

// Import components for the navigation bar and rate limit UI
import NavBar from '../components/NavBar';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios'; // Import the API utility for making requests

// Axios is used to make HTTP requests to the backend

// toast is used for displaying popup error/success messages
import { toast } from 'react-hot-toast';

const HomePage = () => {
  // State to track if the user is being rate-limited (HTTP 429 error)
  const [israteLimited, setIsRateLimited] = useState(false);

  // State to store the notes fetched from the backend
  const [notes, setNotes] = useState([]);

  // State to indicate whether the data is still loading
  const [loading, setLoading] = useState(true);

  // useEffect runs once when the component is mounted (initial render)
  useEffect(() => {
    // Define an asynchronous function to fetch notes
    const fetchNotes = async () => {
      try {
        // Send a GET request to the backend API to fetch notes
        const res = await api.get("/notes");

        // Log the data to the console for debugging
        console.log(res.data);

        // Update state with the fetched notes
        setNotes(res.data);

        // Clear any previous rate-limiting error
        setIsRateLimited(false);
      } catch (error) {
        // Log the error for debugging
        console.error("Error fetching notes:", error);

        // If the error is a 429 Too Many Requests, set rate-limited state
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          // Otherwise, show a generic error toast to the user
          toast.error("Error fetching notes. Please try again later.");
        }
      } finally {
        // Whether successful or failed, stop showing the loading indicator
        setLoading(false);
      }
    };

    // Call the async function to fetch the data
    fetchNotes();
  }, []); // Empty dependency array means this runs only once after the initial render

  // Render the UI
  return (
    <div className="min-h-screen">
      {/* Top navigation bar */}
      <NavBar />

      {/* If the user is rate-limited, show the RateLimitedUI component */}
      {israteLimited && <RateLimitedUI />}

      

      {/* Wrapper for content */}
      <div className="max-w-7xl mx-auto p-4 m-6">
        {notes.length === 0  && !israteLimited && <NotesNotFound/> }
        
        {/* Show loading message while data is being fetched */}
        {loading && <div className="text-center text-primary py-10">Loading notes...</div>}

        {/* Display notes if available and user is not rate-limited */}
        {notes.length > 0 && !israteLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes = {setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
                    
};

export default HomePage;
