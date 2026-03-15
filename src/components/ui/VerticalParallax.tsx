import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VerticalParallaxProps {
  children: React.ReactNode;
  offset?: number; 
  className?: string;
}

export default function VerticalParallax({ 
  children, 
  offset = 100, // Default to a more visible value
  className = "" 
}: VerticalParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current || !containerRef.current) return;

    // console.log("Parallax initialized for:", containerRef.current);

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: -offset,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          // markers: true, // Uncomment this to debug visually
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [offset]);

  return (
    <div ref={containerRef} className={`relative block ${className}`}>
      <div ref={elementRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}
