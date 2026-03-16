import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileViewport, shouldReduceMotion, shouldUseLiteEffects } from '@/utils/device';
import { clamp } from '@/utils/math';

gsap.registerPlugin(ScrollTrigger);

interface VerticalParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  containerAnimation?: gsap.core.Animation;
  trigger?: HTMLElement | null;
  triggerRef?: React.RefObject<HTMLElement | null>;
  disabledOnMobile?: boolean;
  intensity?: number;
  scrub?: number;
  global?: boolean;
}

export default function VerticalParallax({
  children,
  speed = 1.1,
  className = "",
  containerAnimation,
  trigger,
  triggerRef,
  disabledOnMobile = false,
  intensity = 1.25,
  scrub,
  global = false,
}: VerticalParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const isMobile = isMobileViewport();
    const liteMode = shouldUseLiteEffects();
    if ((isMobile && disabledOnMobile) || shouldReduceMotion()) {
      return;
    }

    const activeTrigger = global
      ? document.body
      : trigger || triggerRef?.current || containerRef.current;

    if (!activeTrigger) return;

    const travel = () => {
      const delta = Math.max(Math.abs(speed - 1), 0.18);
      const viewportFactor = isMobile ? 0.055 : liteMode ? 0.08 : 0.11;
      const minTravel = isMobile ? 18 : 30;
      const maxTravel = isMobile ? 84 : 180;
      const signedTravel = window.innerHeight * viewportFactor * (delta + 0.35) * intensity;
      const direction = speed === 1 ? 1 : Math.sign(speed - 1);

      return clamp(minTravel, maxTravel, signedTravel) * direction;
    };

    const scrubValue = scrub ?? (isMobile ? 0.28 : liteMode ? 0.38 : 0.5);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target,
        {
          y: () => travel(),
          force3D: true,
        },
        {
          y: () => -travel(),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: activeTrigger,
            containerAnimation: global ? undefined : containerAnimation,
            start: global ? "top top" : containerAnimation ? "left right" : "top bottom+=8%",
            end: global ? "bottom bottom" : containerAnimation ? "right left" : "bottom top-=8%",
            scrub: scrubValue,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [speed, containerAnimation, trigger, triggerRef, disabledOnMobile, intensity, scrub, global]);

  return (
    <div ref={containerRef} className={`overflow-visible ${className}`}>
      <div ref={targetRef} className="inline-block will-change-transform [transform:translate3d(0,0,0)]">
        {children}
      </div>
    </div>
  );
}
