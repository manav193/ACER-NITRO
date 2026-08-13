import gsap from 'gsap';
import * as THREE from 'three';

export interface LaptopTransformTarget {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

export class LaptopController {
  private group: THREE.Group | null = null;
  private currentTween: gsap.core.Timeline | null = null;

  public setGroup(group: THREE.Group | null) {
    this.group = group;
  }

  public getGroup(): THREE.Group | null {
    return this.group;
  }

  public rotateTo(
    targetRotation: [number, number, number],
    duration: number = 1.2,
    ease: string = 'power2.inOut'
  ): gsap.core.Timeline | null {
    if (!this.group) return null;
    if (this.currentTween) this.currentTween.kill();

    const tl = gsap.timeline();
    tl.to(this.group.rotation, {
      x: targetRotation[0],
      y: targetRotation[1],
      z: targetRotation[2],
      duration,
      ease,
    });

    this.currentTween = tl;
    return tl;
  }

  public moveTo(
    targetPosition: [number, number, number],
    duration: number = 1.2,
    ease: string = 'power2.inOut'
  ): gsap.core.Timeline | null {
    if (!this.group) return null;
    if (this.currentTween) this.currentTween.kill();

    const tl = gsap.timeline();
    tl.to(this.group.position, {
      x: targetPosition[0],
      y: targetPosition[1],
      z: targetPosition[2],
      duration,
      ease,
    });

    this.currentTween = tl;
    return tl;
  }

  public scaleTo(
    targetScale: [number, number, number],
    duration: number = 1.2,
    ease: string = 'power2.inOut'
  ): gsap.core.Timeline | null {
    if (!this.group) return null;
    if (this.currentTween) this.currentTween.kill();

    const tl = gsap.timeline();
    tl.to(this.group.scale, {
      x: targetScale[0],
      y: targetScale[1],
      z: targetScale[2],
      duration,
      ease,
    });

    this.currentTween = tl;
    return tl;
  }

  public animateTransform(
    target: LaptopTransformTarget,
    duration: number = 1.2,
    ease: string = 'power2.inOut'
  ): gsap.core.Timeline | null {
    if (!this.group) return null;
    if (this.currentTween) this.currentTween.kill();

    const tl = gsap.timeline();

    if (target.position) {
      tl.to(
        this.group.position,
        { x: target.position[0], y: target.position[1], z: target.position[2], duration, ease },
        0
      );
    }

    if (target.rotation) {
      tl.to(
        this.group.rotation,
        { x: target.rotation[0], y: target.rotation[1], z: target.rotation[2], duration, ease },
        0
      );
    }

    if (target.scale) {
      tl.to(
        this.group.scale,
        { x: target.scale[0], y: target.scale[1], z: target.scale[2], duration, ease },
        0
      );
    }

    this.currentTween = tl;
    return tl;
  }

  public reset(duration: number = 1.0): gsap.core.Timeline | null {
    return this.animateTransform(
      {
        position: [0, -0.15, 0],
        rotation: [0.15, -0.45, 0.05],
        scale: [1, 1, 1],
      },
      duration
    );
  }
}

export const globalLaptopController = new LaptopController();
