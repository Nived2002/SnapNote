import React, { useState, useEffect, useRef } from "react";
import NotesNotFound from "../components/NotesNotFound";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import LoadingNotes from "../components/LoadingNotes";
import StartupAnimation from "../components/StartUpAnimation";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const MIN_LOADING_TIME = 1000;

let hasShownStartupAnimation = false;  // module-scoped flag

const HomePage = () => {
  const [showAnimation, setShowAnimation] = useState(!hasShownStartupAnimation);

  useEffect(() => {
    if (!hasShownStartupAnimation) {
      hasShownStartupAnimation = true;
    }
  }, []);

  const [israteLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingStartTime = useRef(null);
  

  const handleAnimationFinish = () => {
    setShowAnimation(false);
  };

  useEffect(() => {
    const fetchNotes = async () => {
      loadingStartTime.current = Date.now();

      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Error fetching notes. Please try again later.");
        }
      } finally {
        const elapsed = Date.now() - loadingStartTime.current;
        const remaining = MIN_LOADING_TIME - elapsed;
        if (remaining > 0) {
          setTimeout(() => setLoading(false), remaining);
        } else {
          setLoading(false);
        }
      }
    };

    fetchNotes();
  }, []);

  return (
    <>
      {showAnimation ? (
        <StartupAnimation onFinish={handleAnimationFinish} />
      ) : (
        <div className="min-h-screen">
          <NavBar />
          {israteLimited && <RateLimitedUI />}
          <div className="max-w-7xl mx-auto p-4 m-6">
            {!loading && notes.length === 0 && !israteLimited && <NotesNotFound />}
            {loading && <LoadingNotes />}
            {notes.length > 0 && !loading && !israteLimited && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                  <NoteCard key={note._id} note={note} setNotes={setNotes} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
