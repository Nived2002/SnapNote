import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingNotes = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      {/* Lucide React loader icon with spinning animation */}
      <Loader2 className="w-12 h-12 text-primary animate-spin" />
      
      <p className="text-primary font-semibold text-lg select-none">
        Loading notes...
      </p>
    </div>
  );
};

export default LoadingNotes;
