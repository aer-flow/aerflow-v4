import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface VerticalParallaxProps {
  children: React.ReactNode;
  offset?: number; 
  speed?: number; // Added speed prop for more intuitive parallax
  className?: string;
  containerAnimation?: gsap.core.Animation;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export default function VerticalParallax({ 
  children, 
  offset = 80, 
  speed = 1, // 1 is normal scroll, < 1 is slower, > 1 is faster
  className = "",
  containerAnimation,
  triggerRef
}: VerticalParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current) return;

    // Use triggerRef if provided, otherwise fallback to containerRef
    const trigger = triggerRef?.current || containerRef.current;
    if (!trigger) return;

    const ctx = gsap.context(() => {
      // Calculate y movement based on speed or use offset as fallback/addition
      // If speed is 1, no extra movement. If speed is 1.1, it moves 10% faster.
      const moveDistance = speed !== 1 ? (speed - 1) * 100 : offset;

      gsap.fromTo(targetRef.current, 
        { yPercent: moveDistance },
        {
          yPercent: -moveDistance,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: trigger,
            containerAnimation: containerAnimation,
            start: containerAnimation ? "left right" : "top bottom",
            end: containerAnimation ? "right left" : "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [offset, speed, containerAnimation, triggerRef]);

  return (
    <div ref={containerRef} className={`${className} overflow-visible`}>
      <div ref={targetRef} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
