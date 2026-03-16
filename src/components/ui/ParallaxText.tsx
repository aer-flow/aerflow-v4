import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxTextProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}

export default function ParallaxText({ 
  children, 
  baseVelocity = 150, // Increased for better visibility
  className = "" 
}: ParallaxTextProps) {
  const container = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current || !text.current) return;

    const ctx = gsap.context(() => {
      gsap.to(text.current, {
        x: -baseVelocity,
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [baseVelocity]);

  return (
    <div ref={container} className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={text} className="inline-block will-change-transform">
        {children}
      </div>
    </div>
  );
}
