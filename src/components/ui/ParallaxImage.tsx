import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number; 
  containerAnimation?: gsap.core.Animation;
}

export default function ParallaxImage({ 
  src, 
  alt, 
  className = "", 
  speed = 1.2,
  containerAnimation
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Create a coordinated parallax + zoom effect
      gsap.fromTo(imageRef.current, 
        { 
          yPercent: -10,
          scale: 1.1 
        },
        {
          yPercent: 10,
          scale: 1.25,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            containerAnimation: containerAnimation,
            start: containerAnimation ? "left right" : "top bottom",
            end: containerAnimation ? "right left" : "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed, containerAnimation]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform"
      />
    </div>
  );
}
