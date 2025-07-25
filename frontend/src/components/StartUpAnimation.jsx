import React, { useState, useEffect } from "react";

const StartupAnimation = ({ fadeOut }) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateIn(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`
        fixed inset-0 z-50 flex flex-col items-center justify-center
        transition-opacity duration-700 ease-in-out
        ${fadeOut ? "opacity-0" : "opacity-100"}
        bg-opacity-40 backdrop-blur-sm
      `}
    >
      <h1
        className={`
          text-6xl font-extrabold text-primary select-none mb-8
          transition-transform duration-1000
          ${animateIn ? "scale-110" : "scale-90"}
          animate-pulse
        `}
      >
        SnapNote
      </h1>

      <div className="flex flex-col items-center space-y-4">
        <span className="inline-block w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin-slow" />
        <span className="text-primary font-semibold text-lg select-none tracking-wide">
          Getting things ready...
        </span>
      </div>
    </div>
  );
};

export default StartupAnimation;
