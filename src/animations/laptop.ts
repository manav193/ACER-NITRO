import gsap from 'gsap';
import { Group } from 'three';

export function setupLaptopFloatingAnimation(
  laptopGroup: Group,
  reducedMotion: boolean = false
): gsap.core.Tween | null {
  if (reducedMotion || !laptopGroup) return null;

  return gsap.to(laptopGroup.position, {
    y: '+=0.06',
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}

export function setupLaptopIdleRotation(
  laptopGroup: Group,
  reducedMotion: boolean = false
): gsap.core.Tween | null {
  if (reducedMotion || !laptopGroup) return null;

  return gsap.to(laptopGroup.rotation, {
    y: '+=0.08',
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  });
}
