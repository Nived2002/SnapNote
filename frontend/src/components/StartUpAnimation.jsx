import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const StartupAnimation = ({ onFinish }) => {
  const [animateOut, setAnimateOut] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in on mount (starts blurred+invisible, ends visible+clear)
    const timerIn = setTimeout(() => setAnimateIn(true), 10); // tiny delay to trigger CSS transition

    // After 1 second, start fade-out + blur
    const timerOut = setTimeout(() => setAnimateOut(true), 1000);

    // After 2 seconds, finish animation
    const timerFinish = setTimeout(() => onFinish(), 2000);

    return () => {
      clearTimeout(timerIn);
      clearTimeout(timerOut);
      clearTimeout(timerFinish);
    };
  }, [onFinish]);

  return (
    <div
      className={`
        fixed inset-0 border-[#74e63c] flex flex-col items-center justify-center
        transition-all duration-1000
        ${animateIn ? "opacity-100 blur-0" : "opacity-0 blur-sm"}
        ${animateOut ? "opacity-0 blur-sm" : ""}
      `}
      style={{ zIndex: 9999 }}
    >
      <h1
        className={`
          text-6xl font-extrabold text-primary mb-6 select-none
          transition-transform duration-1000
          ${animateOut ? "scale-75" : "scale-110"}
        `}
      >
        SnapNote
      </h1>
      <div className="flex items-center space-x-3">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <span className="text-primary font-semibold text-lg select-none">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default StartupAnimation;
