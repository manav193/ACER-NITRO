import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function createHeroIntroTimeline(
  heroTextRef: HTMLElement | null,
  reducedMotion: boolean = false
): gsap.core.Timeline {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (!heroTextRef) return tl;

  if (reducedMotion) {
    tl.set(heroTextRef.children, { opacity: 1, y: 0 });
    return tl;
  }

  tl.fromTo(
    heroTextRef.children,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.15,
      delay: 0.3,
    }
  );

  return tl;
}

export function killTimelines(...timelines: (gsap.core.Timeline | gsap.core.Tween | null)[]) {
  timelines.forEach((tl) => {
    if (tl) {
      tl.kill();
    }
  });
}
