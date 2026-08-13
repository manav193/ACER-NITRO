import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { CameraPresetName } from '@/lib/cameraPresets';
import { LightingPresetName } from '@/lib/lightingPresets';
import { FanHighlightMode, KeyboardHighlightMode, PortHighlightMode } from '@/components/3d/LaptopModel';
import { globalLaptopController } from './laptopController';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StoryState {
  sceneIndex: number;
  sceneName: string;
  cameraPreset: CameraPresetName;
  lightingPreset: LightingPresetName;
  fanHighlight: FanHighlightMode;
  keyboardHighlight: KeyboardHighlightMode;
  portHighlight: PortHighlightMode;
  showAirflow: boolean;
  progress: number;
}

export interface StoryTimelineCallbacks {
  onStateChange: (state: StoryState) => void;
}

export function createMasterStoryTimeline(
  container: HTMLElement,
  callbacks: StoryTimelineCallbacks
): gsap.core.Timeline {
  const masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: '+=2000%',
      scrub: 1.2,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        let index = 1;
        let name = 'HERO';
        let cam: CameraPresetName = 'HERO';
        let light: LightingPresetName = 'HERO_LIGHTING';
        let fan: FanHighlightMode = 'NONE';
        let key: KeyboardHighlightMode = 'NONE';
        let port: PortHighlightMode = 'NONE';
        let airflow = false;

        if (progress < 0.05) {
          index = 1; name = 'HERO'; cam = 'HERO'; light = 'HERO_LIGHTING';
        } else if (progress < 0.10) {
          index = 2; name = 'CPU (Ryzen 5 6600H)'; cam = 'FRONT'; light = 'HERO_LIGHTING';
        } else if (progress < 0.15) {
          index = 3; name = 'GPU (RTX 3050)'; cam = 'THREE_QUARTER'; light = 'HERO_LIGHTING';
        } else if (progress < 0.20) {
          index = 4; name = 'DISPLAY (165Hz)'; cam = 'DISPLAY_CLOSE'; light = 'DISPLAY_LIGHTING';
        } else if (progress < 0.25) {
          index = 5; name = 'MEMORY (16GB DDR5)'; cam = 'KEYBOARD_CLOSE'; light = 'KEYBOARD_LIGHTING';
        } else if (progress < 0.30) {
          index = 6; name = 'STORAGE (512GB NVMe)'; cam = 'FRONT'; light = 'HERO_LIGHTING';
        } else if (progress < 0.36) {
          index = 7; name = 'DUAL-FAN COOLING'; cam = 'BOTTOM'; light = 'HERO_LIGHTING'; fan = 'BOTH'; airflow = true;
        } else if (progress < 0.41) {
          index = 8; name = 'FULL-SIZE KEYBOARD'; cam = 'KEYBOARD_CLOSE'; light = 'KEYBOARD_LIGHTING'; key = 'KEYBOARD';
        } else if (progress < 0.46) {
          index = 9; name = 'NUMPAD INSPECTION'; cam = 'NUMPAD_CLOSE'; light = 'KEYBOARD_LIGHTING'; key = 'NUMPAD';
        } else if (progress < 0.51) {
          index = 10; name = 'WHITE BACKLIGHT'; cam = 'KEYBOARD_CLOSE'; light = 'KEYBOARD_LIGHTING'; key = 'BACKLIGHT';
        } else if (progress < 0.56) {
          index = 11; name = 'NITROSENSE KEY'; cam = 'NITROSENSE_CLOSE'; light = 'KEYBOARD_LIGHTING'; key = 'NITROSENSE';
        } else if (progress < 0.61) {
          index = 12; name = 'COPILOT KEY'; cam = 'COPILOT_CLOSE'; light = 'KEYBOARD_LIGHTING'; key = 'COPILOT';
        } else if (progress < 0.66) {
          index = 13; name = 'PRECISION TRACKPAD'; cam = 'TRACKPAD_CLOSE'; light = 'KEYBOARD_LIGHTING'; key = 'TRACKPAD';
        } else if (progress < 0.70) {
          index = 14; name = 'CONNECT. CREATE. PLAY.'; cam = 'PORTS_INTRO'; light = 'HERO_LIGHTING'; port = 'NONE';
        } else if (progress < 0.74) {
          index = 15; name = 'LEFT SIDE PORTS'; cam = 'LEFT_PORTS'; light = 'HERO_LIGHTING'; port = 'LEFT_ALL';
        } else if (progress < 0.77) {
          index = 16; name = 'DC POWER & ETHERNET'; cam = 'LEFT_POWER'; light = 'HERO_LIGHTING'; port = 'POWER_ETHERNET';
        } else if (progress < 0.80) {
          index = 17; name = 'HDMI DISPLAY OUTPUT'; cam = 'LEFT_HDMI'; light = 'HERO_LIGHTING'; port = 'HDMI';
        } else if (progress < 0.83) {
          index = 18; name = 'USB-C CHARGING'; cam = 'LEFT_USB_C'; light = 'HERO_LIGHTING'; port = 'USB_C';
        } else if (progress < 0.86) {
          index = 19; name = 'RIGHT SIDE PORTS'; cam = 'RIGHT_HEADPHONE'; light = 'HERO_LIGHTING'; port = 'HEADPHONE';
        } else if (progress < 0.88) {
          index = 20; name = 'PORT SUMMARY'; cam = 'PORTS_SUMMARY'; light = 'HERO_LIGHTING'; port = 'ALL_PORTS';
        } else if (progress < 0.91) {
          index = 21; name = 'FULL PRODUCT REVEAL'; cam = 'HERO'; light = 'HERO_LIGHTING'; port = 'NONE';
        } else if (progress < 0.94) {
          index = 22; name = 'COMPLETE SPECIFICATIONS'; cam = 'THREE_QUARTER'; light = 'HERO_LIGHTING';
        } else if (progress < 0.97) {
          index = 23; name = 'INTERACTIVE EXPLORER'; cam = 'THREE_QUARTER'; light = 'HERO_LIGHTING';
        } else {
          index = 24; name = 'CINEMATIC FINALE'; cam = 'HERO'; light = 'HERO_LIGHTING';
        }

        callbacks.onStateChange({
          sceneIndex: index,
          sceneName: name,
          cameraPreset: cam,
          lightingPreset: light,
          fanHighlight: fan,
          keyboardHighlight: key,
          portHighlight: port,
          showAirflow: airflow,
          progress,
        });
      },
    },
  });

  const transformProxy = {
    rx: 0.15,
    ry: -0.45,
    rz: 0.05,
    px: 0,
    py: -0.15,
    pz: 0,
  };

  const updateLaptop = () => {
    const group = globalLaptopController.getGroup();
    if (group) {
      group.rotation.set(transformProxy.rx, transformProxy.ry, transformProxy.rz);
      group.position.set(transformProxy.px, transformProxy.py, transformProxy.pz);
    }
  };

  masterTl
    .to(transformProxy, { rx: 0.15, ry: -0.45, rz: 0.05, px: 0, py: -0.15, pz: 0, duration: 1, onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.08, ry: -0.15, rz: 0, px: 0, py: -0.1, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.12, ry: 0.35, rz: 0, px: 0, py: -0.12, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.02, ry: 0, rz: 0, px: 0, py: -0.05, pz: 0.2, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.3, ry: -0.15, rz: 0, px: 0, py: -0.2, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: -0.1, ry: 0.25, rz: 0, px: 0, py: -0.08, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: -0.35, ry: 0.5, rz: 0, px: 0, py: 0.1, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.3, ry: -0.15, rz: 0, px: 0, py: -0.2, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.32, ry: -0.1, rz: 0, px: -0.3, py: -0.18, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.3, ry: -0.15, rz: 0, px: 0, py: -0.2, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.28, ry: -0.08, rz: 0, px: -0.2, py: -0.12, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.28, ry: -0.05, rz: 0, px: -0.1, py: -0.12, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.25, ry: 0, rz: 0, px: 0.1, py: -0.15, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.1, ry: -0.5, rz: 0, px: 0, py: -0.1, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.1, ry: 0.65, rz: 0, px: 0.2, py: -0.1, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.08, ry: 0.7, rz: 0, px: 0.3, py: -0.08, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.08, ry: 0.68, rz: 0, px: 0.3, py: -0.08, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.08, ry: 0.65, rz: 0, px: 0.3, py: -0.08, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.08, ry: -0.68, rz: 0, px: -0.3, py: -0.08, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.15, ry: -0.4, rz: 0, px: 0, py: -0.12, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.15, ry: -0.45, rz: 0.05, px: 0, py: -0.15, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.12, ry: -0.35, rz: 0.04, px: 0, py: -0.15, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.15, ry: -0.45, rz: 0.05, px: 0, py: -0.15, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop })
    .to(transformProxy, { rx: 0.15, ry: -0.45, rz: 0.05, px: 0, py: -0.15, pz: 0, duration: 1, ease: 'power2.inOut', onUpdate: updateLaptop });

  return masterTl;
}
