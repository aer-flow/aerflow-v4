import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VerticalParallaxProps {
  children: React.ReactNode;
  offset?: number; 
  className?: string;
  containerAnimation?: gsap.core.Animation;
}

export default function VerticalParallax({ 
  children, 
  offset = 80, 
  className = "",
  containerAnimation
}: VerticalParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, 
        { y: offset },
        {
          y: -offset,
          ease: "none",
          force3D: true, // Hardware acceleration
          overwrite: 'auto',
          scrollTrigger: {
            trigger: ref.current,
            containerAnimation: containerAnimation,
            start: containerAnimation ? "left right" : "top bottom",
            end: containerAnimation ? "right left" : "bottom top",
            scrub: 1, // Smooth interpolation (1s lag)
            anticipatePin: 1
          }
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [offset, containerAnimation]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
