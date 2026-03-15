import { useState, useEffect } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+";

export default function GlitchText({ text, as: Component = 'span', className = '' }: any) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    let interval: any;

    interval = setInterval(() => {
      setDisplayText((_prev: string) => 
        text
          .split("")
          .map((_letter: string, index: number) => {
            if (index < iteration) return text[index];
            return LETTERS[Math.floor(Math.random() * 38)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return (
    <Component 
      className={className} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      {displayText}
    </Component>
  );
}
