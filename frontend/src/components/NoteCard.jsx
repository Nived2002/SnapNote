import React from 'react';
import { Link } from 'react-router'; // Fixed incorrect import
import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import { formatDate } from '../lib/util';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion'; // ✅ Import motion

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${note._id}`);
      setNotes((prevNotes) => prevNotes.filter(note => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note. Please try again later.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link
        to={`/note/${note._id}`}
        className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#74e63c]"
      >
        <div className='card-body'>
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
          <div className='card-actions justify-between items-center mt-4'>
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className="size-4" />
              <button
                className='btn btn-ghost btn-xs text-error'
                onClick={(e) => handleDelete(e, note._id)}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default NoteCard;
