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
  disabledOnMobile?: boolean;
}

export default function VerticalParallax({ 
  children, 
  speed = 1.1,
  className = "",
  containerAnimation,
  trigger,
  triggerRef,
  disabledOnMobile = false
}: VerticalParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile && disabledOnMobile) {
      return;
    }

      // Resolve trigger: prioritize direct element, then ref, then fallback to container
    const activeTrigger = trigger || triggerRef?.current || containerRef.current;
    if (!activeTrigger) return;

    const ctx = gsap.context(() => {
      
      const baseIntensity = isMobile ? 0.15 : 0.05; // Balanced: 0.15 on mobile, 0.05 on desktop
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
            scrub: isMobile ? 0.5 : 1, // Smoothed on mobile (0.5) and desktop (1)
            invalidateOnRefresh: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed, containerAnimation, trigger, triggerRef]);

  return (
    <div ref={containerRef} className={`${className} overflow-visible`}>
      <div ref={targetRef} className="w-full h-full transform-gpu will-change-transform">
        {children}
      </div>
    </div>
  );
}
