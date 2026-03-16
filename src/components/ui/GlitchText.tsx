import { useEffect, useRef, useState } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export default function GlitchText({ text, className = '' }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isHovered) return;

    let iteration = 0;

    intervalRef.current = window.setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((_letter: string, index: number) => {
            if (index < iteration) return text[index];
            return LETTERS[Math.floor(Math.random() * 38)];
          })
          .join("")
      );

      if (iteration >= text.length && intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      iteration += 1 / 3;
    }, 30);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, text]);

  return (
    <span
      className={className} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => {
        setIsHovered(false);
        setDisplayText(text);
      }}
    >
      {displayText}
    </span>
  );
}
