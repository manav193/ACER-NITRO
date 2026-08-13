export type LightingPresetName = 'HERO_LIGHTING' | 'DISPLAY_LIGHTING' | 'KEYBOARD_LIGHTING';

export interface LightingConfig {
  ambientIntensity: number;
  keyLightIntensity: number;
  rimLightIntensity: number;
  fillLightIntensity: number;
  contactShadowOpacity: number;
}

export const LIGHTING_PRESETS: Record<LightingPresetName, LightingConfig> = {
  HERO_LIGHTING: {
    ambientIntensity: 0.4,
    keyLightIntensity: 1.8,
    rimLightIntensity: 3.5,
    fillLightIntensity: 0.6,
    contactShadowOpacity: 0.7,
  },
  DISPLAY_LIGHTING: {
    ambientIntensity: 0.25,
    keyLightIntensity: 2.2,
    rimLightIntensity: 1.5,
    fillLightIntensity: 0.3,
    contactShadowOpacity: 0.85,
  },
  KEYBOARD_LIGHTING: {
    ambientIntensity: 0.3,
    keyLightIntensity: 1.2,
    rimLightIntensity: 2.0,
    fillLightIntensity: 0.5,
    contactShadowOpacity: 0.8,
  },
};
