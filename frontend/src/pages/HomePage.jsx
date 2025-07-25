import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router";  // make sure you have react-router-dom installed
import NotesNotFound from "../components/NotesNotFound";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import NoteCard from "../components/NoteCard";
import LoadingNotes from "../components/LoadingNotes";
import StartupAnimation from "../components/StartUpAnimation";
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const MIN_ANIMATION_DURATION = 3000;

const HomePage = () => {
  const location = useLocation();

  // Reset animation whenever location changes to "/"
  const [showAnimation, setShowAnimation] = useState(true);
  const [fadeOutAnimation, setFadeOutAnimation] = useState(false);
  const [fadeInContent, setFadeInContent] = useState(false);

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const animationStartTime = useRef(null);

  // Reset animation when route changes to homepage
  useEffect(() => {
    if (location.pathname === "/") {
      setShowAnimation(true);
      setFadeOutAnimation(false);
      setFadeInContent(false);
      setLoading(true);  // optionally reset loading so fetch triggers animation properly
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!showAnimation) return; // don't fetch if animation hidden (optional safety)

    animationStartTime.current = Date.now();

    const fetchNotes = async () => {
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
        setLoading(false);
      }
    };

    fetchNotes();
  }, [showAnimation]);

  useEffect(() => {
    if (!loading && showAnimation) {
      const elapsed = Date.now() - animationStartTime.current;
      const remaining = MIN_ANIMATION_DURATION - elapsed;

      const fadeOutTimer = setTimeout(() => {
        setFadeOutAnimation(true);
        setFadeInContent(true);
      }, remaining > 500 ? remaining - 500 : 0);

      const unmountTimer = setTimeout(() => {
        setShowAnimation(false);
      }, remaining > 0 ? remaining : 0);

      return () => {
        clearTimeout(fadeOutTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [loading, showAnimation]);

  return (
    <div className="relative min-h-screen">
      {showAnimation && <StartupAnimation fadeOut={fadeOutAnimation} />}

      <div
        className={`transition-opacity duration-1000 ${
          fadeInContent ? "opacity-100" : "opacity-0"
        }`}
      >
        <NavBar />
        {isRateLimited && <RateLimitedUI />}
        <div className="max-w-7xl mx-auto p-4 m-6">
          {!loading && notes.length === 0 && !isRateLimited && <NotesNotFound />}
          {loading && <LoadingNotes />}
          {notes.length > 0 && !loading && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
