import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileViewport, shouldReduceMotion } from '@/utils/device';

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

    const isMobile = isMobileViewport();
    if (shouldReduceMotion()) return;

    const ctx = gsap.context(() => {
      // On mobile horizontal sections, disable internal parallax entirely for FPS
      if (containerAnimation || (isMobile && containerAnimation)) return;

      // Create a coordinated parallax + zoom effect
      gsap.fromTo(imageRef.current, 
        { 
          yPercent: isMobile ? -3 : -6,
          scale: isMobile ? 1.02 : 1.06
        },
        {
          yPercent: isMobile ? 3 : 6,
          scale: isMobile ? 1.08 : 1.14,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: containerRef.current,
            containerAnimation: containerAnimation,
            start: containerAnimation ? "left right" : "top bottom",
            end: containerAnimation ? "right left" : "bottom top",
            scrub: isMobile ? 0.35 : 0.6,
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
