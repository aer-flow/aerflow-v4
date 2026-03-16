import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VerticalParallaxProps {
  children: React.ReactNode;
  speed?: number; 
  className?: string;
  containerAnimation?: gsap.core.Animation;
  // Accept direct element or ref for better stability
  trigger?: HTMLElement | null;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function VerticalParallax({ 
  children, 
  speed = 1.1,
  className = "",
  containerAnimation,
  trigger,
  triggerRef
}: VerticalParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    // Resolve trigger: prioritize direct element, then ref, then fallback to container
    const activeTrigger = trigger || triggerRef?.current || containerRef.current;
    if (!activeTrigger) return;

    const ctx = gsap.context(() => {
      // Responsive Damping: Significantly reduce intensity on mobile
      const isMobile = window.innerWidth < 768;
      const baseIntensity = isMobile ? 0.35 : 0.6; // Increased mobile intensity (was 0.15)
      
      const moveDistance = (speed - 1) * window.innerHeight * baseIntensity; 

      gsap.fromTo(targetRef.current, 
        { y: moveDistance },
        {
          y: -moveDistance,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: activeTrigger,
            containerAnimation: containerAnimation,
            start: containerAnimation ? "left right" : "top bottom",
            end: containerAnimation ? "right left" : "bottom top",
            scrub: isMobile ? 0.6 : 1, // Added interpolation on mobile (was 'true') to prevent "steps"
            invalidateOnRefresh: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed, containerAnimation, trigger, triggerRef]);

  return (
    <div ref={containerRef} className={`${className} overflow-visible`}>
      <div ref={targetRef} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
