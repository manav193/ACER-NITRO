'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { MODEL_PATH } from '@/lib/constants';
import { normalizeLaptopTransform } from '@/lib/normalization';
import { registerLaptopParts, LaptopPartRegistry } from '@/lib/partRegistry';
import { globalLaptopController } from '@/animations/laptopController';
import { KeyboardBacklightState, BACKLIGHT_STATES } from '@/lib/keyboardLighting';

export type FanHighlightMode = 'NONE' | 'LEFT' | 'RIGHT' | 'BOTH';
export type KeyboardHighlightMode =
  | 'NONE'
  | 'KEYBOARD'
  | 'NUMPAD'
  | 'BACKLIGHT'
  | 'NITROSENSE'
  | 'COPILOT'
  | 'TRACKPAD'
  | 'FULL_INPUT';
export type PortHighlightMode =
  | 'NONE'
  | 'LEFT_ALL'
  | 'POWER_ETHERNET'
  | 'HDMI'
  | 'USB_C'
  | 'RIGHT_ALL'
  | 'RIGHT_USB_A'
  | 'HEADPHONE'
  | 'ALL_PORTS';

interface LaptopModelProps {
  reducedMotion?: boolean;
  backlightState?: KeyboardBacklightState;
  fanHighlight?: FanHighlightMode;
  keyboardHighlight?: KeyboardHighlightMode;
  portHighlight?: PortHighlightMode;
  onModelLoaded?: (isRealGLB: boolean, registry: LaptopPartRegistry) => void;
}

// GPU-Instanced Keycap Deck Mesh Overlay (102 Keys)
function InstancedKeycapDeck({
  backlightColor,
  backlightIntensity,
  keyboardHighlight,
}: {
  backlightColor: string;
  backlightIntensity: number;
  keyboardHighlight: KeyboardHighlightMode;
}) {
  const instancedRef = useRef<THREE.InstancedMesh>(null);

  const keyCount = 102;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useEffect(() => {
    if (!instancedRef.current) return;

    let index = 0;
    const spacing = 0.062;

    // Main Keyboard Block (5 rows x 15 cols)
    const startX = -0.92;
    const startZ = -0.28;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 15; c++) {
        if (index >= keyCount) break;

        const posX = startX + c * spacing;
        const posZ = startZ + r * spacing;

        dummy.position.set(posX, 0.008, posZ);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();

        instancedRef.current.setMatrixAt(index++, dummy.matrix);
      }
    }

    // NUMPAD Block (5 rows x 4 cols)
    const numpadStartX = 0.38;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 4; c++) {
        if (index >= keyCount) break;
        const posX = numpadStartX + c * spacing;
        const posZ = startZ + r * spacing;

        dummy.position.set(posX, 0.008, posZ);
        dummy.scale.set(1, 1, 1);
        dummy.updateMatrix();

        instancedRef.current.setMatrixAt(index++, dummy.matrix);
      }
    }

    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  const emissiveColor =
    keyboardHighlight === 'BACKLIGHT' || keyboardHighlight === 'KEYBOARD' || keyboardHighlight === 'NUMPAD'
      ? '#ffffff'
      : backlightColor;

  const emissiveInt =
    keyboardHighlight === 'BACKLIGHT' || keyboardHighlight === 'KEYBOARD' || keyboardHighlight === 'NUMPAD'
      ? 0.8
      : backlightIntensity;

  return (
    <group position={[0, 0.005, 0]}>
      <instancedMesh ref={instancedRef} args={[undefined, undefined, keyCount]}>
        <boxGeometry args={[0.055, 0.008, 0.055]} />
        <meshStandardMaterial
          color="#161820"
          emissive={emissiveColor}
          emissiveIntensity={emissiveInt}
          roughness={0.4}
          polygonOffset
          polygonOffsetFactor={-1}
          polygonOffsetUnits={-1}
        />
      </instancedMesh>
    </group>
  );
}

export function LaptopModel({
  reducedMotion = false,
  backlightState = 'ACTIVE',
  fanHighlight = 'NONE',
  keyboardHighlight = 'NONE',
  portHighlight = 'NONE',
  onModelLoaded,
}: LaptopModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [modelStatus, setModelStatus] = useState<'LOADING' | 'SUCCESS' | 'ERROR'>('LOADING');
  const registryRef = useRef<LaptopPartRegistry>({});
  const normalizedSceneRef = useRef<THREE.Object3D | null>(null);

  // Dynamic 165Hz Display Texture Generator
  const displayCanvas = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createLinearGradient(0, 0, 1024, 640);
    grad.addColorStop(0, '#06080e');
    grad.addColorStop(0.5, '#0c1220');
    grad.addColorStop(1, '#05070a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 640);

    ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 640);
      ctx.stroke();
    }
    for (let y = 0; y < 640; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#ff3b00';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#ff3b00';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(512, 240);
    ctx.lineTo(570, 380);
    ctx.lineTo(454, 380);
    ctx.closePath();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('165Hz  |  15.6" FHD IPS', 512, 450);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '18px monospace';
    ctx.fillText('AMD RYZEN 5 6600H  •  NVIDIA GEFORCE RTX 3050', 512, 490);

    return new THREE.CanvasTexture(canvas);
  }, []);

  // Texture Memory Cleanup on Unmount
  useEffect(() => {
    return () => {
      if (displayCanvas) {
        displayCanvas.dispose();
      }
    };
  }, [displayCanvas]);

  // Safe GLB Load
  let gltfData: any = null;
  try {
    gltfData = useGLTF(MODEL_PATH, true);
  } catch (err) {
    // Model not found fallback
  }

  useEffect(() => {
    if (groupRef.current) {
      globalLaptopController.setGroup(groupRef.current);
    }
  }, []);

  useEffect(() => {
    if (gltfData && gltfData.scene) {
      // Guarantee normalizeLaptopTransform runs ONCE per scene instance
      if (normalizedSceneRef.current !== gltfData.scene) {
        normalizeLaptopTransform(gltfData.scene, 2.4);
        normalizedSceneRef.current = gltfData.scene;
      }

      const reg = registerLaptopParts(gltfData.scene);
      registryRef.current = reg;

      // Apply display texture specifically to display screen mesh primitive
      gltfData.scene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const matName = child.material.name ? child.material.name.toLowerCase() : '';
          if (matName.includes('display') && displayCanvas) {
            child.material.map = displayCanvas;
            child.material.needsUpdate = true;
          }
        }
      });

      setModelStatus('SUCCESS');
      onModelLoaded?.(true, reg);
    } else {
      if (groupRef.current) {
        const reg = registerLaptopParts(groupRef.current);
        registryRef.current = reg;
        setModelStatus('ERROR');
        onModelLoaded?.(false, reg);
      }
    }
  }, [gltfData, displayCanvas, onModelLoaded]);

  // Frame Loop for gentle idle movement if enabled
  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y += Math.sin(t * 1.5) * 0.0003;
  });

  const backlightConfig = BACKLIGHT_STATES[backlightState] || BACKLIGHT_STATES.ACTIVE;

  // Fan highlight emissive colors
  const leftFanEmissive = fanHighlight === 'LEFT' || fanHighlight === 'BOTH' ? '#ff3b00' : '#0a0a0d';
  const leftFanIntensity = fanHighlight === 'LEFT' || fanHighlight === 'BOTH' ? 0.6 : 0;

  const rightFanEmissive = fanHighlight === 'RIGHT' || fanHighlight === 'BOTH' ? '#3b82f6' : '#0a0a0d';
  const rightFanIntensity = fanHighlight === 'RIGHT' || fanHighlight === 'BOTH' ? 0.6 : 0;

  // Keyboard deck highlight states
  const numpadEmissive = keyboardHighlight === 'NUMPAD' || keyboardHighlight === 'FULL_INPUT' ? '#ffffff' : backlightConfig.color;
  const numpadIntensity = keyboardHighlight === 'NUMPAD' ? 0.8 : backlightConfig.intensity;

  const nitroSenseEmissive = keyboardHighlight === 'NITROSENSE' || keyboardHighlight === 'FULL_INPUT' ? '#ff3b00' : '#ff3b00';
  const nitroSenseIntensity = keyboardHighlight === 'NITROSENSE' ? 1.0 : 0.6;

  const copilotEmissive = keyboardHighlight === 'COPILOT' || keyboardHighlight === 'FULL_INPUT' ? '#3b82f6' : '#3b82f6';
  const copilotIntensity = keyboardHighlight === 'COPILOT' ? 1.0 : 0.4;

  const trackpadEmissive = keyboardHighlight === 'TRACKPAD' || keyboardHighlight === 'FULL_INPUT' ? '#38bdf8' : '#000000';
  const trackpadIntensity = keyboardHighlight === 'TRACKPAD' ? 0.4 : 0;

  // Port highlight emissive colors
  const leftPortsEmissive =
    portHighlight === 'LEFT_ALL' ||
    portHighlight === 'POWER_ETHERNET' ||
    portHighlight === 'HDMI' ||
    portHighlight === 'USB_C' ||
    portHighlight === 'ALL_PORTS'
      ? '#ff3b00'
      : '#334155';
  const leftPortsIntensity =
    portHighlight === 'POWER_ETHERNET' || portHighlight === 'HDMI' || portHighlight === 'USB_C' ? 0.8 : portHighlight === 'LEFT_ALL' || portHighlight === 'ALL_PORTS' ? 0.4 : 0;

  const rightPortsEmissive =
    portHighlight === 'RIGHT_ALL' || portHighlight === 'RIGHT_USB_A' || portHighlight === 'HEADPHONE' || portHighlight === 'ALL_PORTS'
      ? '#3b82f6'
      : '#334155';
  const rightPortsIntensity =
    portHighlight === 'RIGHT_USB_A' || portHighlight === 'HEADPHONE' ? 0.8 : portHighlight === 'RIGHT_ALL' || portHighlight === 'ALL_PORTS' ? 0.4 : 0;

  // Update specific node materials for GLB loaded model
  useEffect(() => {
    if (modelStatus !== 'SUCCESS' || !registryRef.current) return;

    const reg = registryRef.current;

    // NitroSense / Turbo Button node highlight
    if (reg.nitroSenseKey) {
      reg.nitroSenseKey.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.emissive = new THREE.Color(nitroSenseEmissive);
          child.material.emissiveIntensity = nitroSenseIntensity;
        }
      });
    }

    // Trackpad node highlight
    if (reg.trackpad) {
      reg.trackpad.traverse((child: any) => {
        if (child.isMesh && child.material) {
          child.material.emissive = new THREE.Color(trackpadEmissive);
          child.material.emissiveIntensity = trackpadIntensity;
        }
      });
    }
  }, [modelStatus, keyboardHighlight, nitroSenseEmissive, nitroSenseIntensity, trackpadEmissive, trackpadIntensity]);

  // Real GLB Scene render (SUCCESS status state guarantees 100% deterministic model render)
  if (modelStatus === 'SUCCESS' && gltfData?.scene) {
    return (
      <group ref={groupRef} position={[0, -0.15, 0]} rotation={[0.15, -0.45, 0.05]}>
        <primitive object={gltfData.scene} />

        {/* GPU-Instanced Keycap Deck Overlay (102 Keys) */}
        <InstancedKeycapDeck
          backlightColor={backlightConfig.color}
          backlightIntensity={backlightConfig.intensity}
          keyboardHighlight={keyboardHighlight}
        />

        {/* Spatial Overlay for Copilot Key */}
        {keyboardHighlight === 'COPILOT' || keyboardHighlight === 'FULL_INPUT' ? (
          <mesh position={[0.22, 0.008, 0.38]}>
            <boxGeometry args={[0.08, 0.005, 0.08]} />
            <meshStandardMaterial
              color="#3b82f6"
              emissive={copilotEmissive}
              emissiveIntensity={copilotIntensity}
              transparent
              opacity={0.85}
              polygonOffset
              polygonOffsetFactor={-1}
              polygonOffsetUnits={-1}
            />
          </mesh>
        ) : null}

        {/* Physical Port Recess Inserts (Left Chassis Edge: DC, Ethernet, HDMI, 2x USB-A, USB-C) */}
        <group position={[-1.205, -0.01, 0]}>
          {/* DC Power */}
          <mesh position={[0, 0, -0.4]}>
            <boxGeometry args={[0.015, 0.025, 0.07]} />
            <meshStandardMaterial
              color="#334155"
              emissive={portHighlight === 'POWER_ETHERNET' ? '#ff3b00' : leftPortsEmissive}
              emissiveIntensity={portHighlight === 'POWER_ETHERNET' ? 0.9 : leftPortsIntensity}
              metalness={0.9}
            />
          </mesh>
          {/* Ethernet RJ-45 */}
          <mesh position={[0, 0, -0.25]}>
            <boxGeometry args={[0.015, 0.025, 0.11]} />
            <meshStandardMaterial
              color="#334155"
              emissive={portHighlight === 'POWER_ETHERNET' ? '#ff3b00' : leftPortsEmissive}
              emissiveIntensity={portHighlight === 'POWER_ETHERNET' ? 0.9 : leftPortsIntensity}
              metalness={0.9}
            />
          </mesh>
          {/* HDMI */}
          <mesh position={[0, 0, -0.1]}>
            <boxGeometry args={[0.015, 0.02, 0.09]} />
            <meshStandardMaterial
              color="#334155"
              emissive={portHighlight === 'HDMI' ? '#3b82f6' : leftPortsEmissive}
              emissiveIntensity={portHighlight === 'HDMI' ? 0.9 : leftPortsIntensity}
              metalness={0.9}
            />
          </mesh>
          {/* USB-A 1 (Left) */}
          <mesh position={[0, 0, 0.08]}>
            <boxGeometry args={[0.015, 0.018, 0.07]} />
            <meshStandardMaterial
              color="#334155"
              emissive={leftPortsEmissive}
              emissiveIntensity={leftPortsIntensity}
              metalness={0.9}
            />
          </mesh>
          {/* USB-A 2 (Left) */}
          <mesh position={[0, 0, 0.25]}>
            <boxGeometry args={[0.015, 0.018, 0.07]} />
            <meshStandardMaterial
              color="#334155"
              emissive={leftPortsEmissive}
              emissiveIntensity={leftPortsIntensity}
              metalness={0.9}
            />
          </mesh>
          {/* USB-C */}
          <mesh position={[0, 0, 0.45]}>
            <boxGeometry args={[0.015, 0.012, 0.07]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive={portHighlight === 'USB_C' ? '#38bdf8' : leftPortsEmissive}
              emissiveIntensity={portHighlight === 'USB_C' ? 1.0 : leftPortsIntensity}
              metalness={0.9}
            />
          </mesh>
        </group>

        {/* Physical Port Recess Inserts (Right Chassis Edge: USB-A, 3.5mm Headphone) */}
        <group position={[1.205, -0.01, 0]}>
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[0.015, 0.02, 0.07]} />
            <meshStandardMaterial
              color="#334155"
              emissive={portHighlight === 'RIGHT_USB_A' ? '#3b82f6' : rightPortsEmissive}
              emissiveIntensity={portHighlight === 'RIGHT_USB_A' ? 0.9 : rightPortsIntensity}
              metalness={0.9}
            />
          </mesh>
          <mesh position={[0, 0, 0.3]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.01, 0.01, 0.015, 16]} />
            <meshStandardMaterial
              color="#1e293b"
              emissive={portHighlight === 'HEADPHONE' ? '#a855f7' : rightPortsEmissive}
              emissiveIntensity={portHighlight === 'HEADPHONE' ? 0.9 : rightPortsIntensity}
              metalness={0.8}
            />
          </mesh>
        </group>
      </group>
    );
  }

  // Production-grade procedural model fallback (Only on ERROR status state)
  return (
    <group ref={groupRef} position={[0, -0.15, 0]} rotation={[0.15, -0.45, 0.05]}>
      {/* BASE CHASSIS */}
      <mesh name="chassis" position={[0, -0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.08, 1.6]} />
        <meshStandardMaterial
          color="#121318"
          roughness={0.35}
          metalness={0.65}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* KEYBOARD DECK AREA */}
      <mesh position={[0, 0.002, 0.1]} receiveShadow>
        <boxGeometry args={[2.2, 0.005, 1.2]} />
        <meshStandardMaterial color="#0b0c10" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* KEYBOARD (White-only backlight strictly!) */}
      <group name="keyboard" position={[0, 0.01, 0.1]}>
        <mesh position={[-0.35, 0, 0]}>
          <boxGeometry args={[1.3, 0.01, 0.9]} />
          <meshStandardMaterial
            color="#181920"
            emissive={backlightConfig.color}
            emissiveIntensity={keyboardHighlight === 'BACKLIGHT' ? 0.8 : backlightConfig.intensity}
            roughness={0.4}
          />
        </mesh>

        <mesh name="numpad" position={[0.65, 0, 0]}>
          <boxGeometry args={[0.4, 0.01, 0.9]} />
          <meshStandardMaterial
            color="#181920"
            emissive={numpadEmissive}
            emissiveIntensity={numpadIntensity}
            roughness={0.4}
          />
        </mesh>

        <mesh name="nitrosensekey" position={[0.42, 0.006, -0.38]}>
          <boxGeometry args={[0.08, 0.012, 0.08]} />
          <meshStandardMaterial
            color="#ff3b00"
            emissive={nitroSenseEmissive}
            emissiveIntensity={nitroSenseIntensity}
            roughness={0.2}
          />
        </mesh>

        <mesh name="copilotkey" position={[0.22, 0.006, 0.38]}>
          <boxGeometry args={[0.08, 0.012, 0.08]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive={copilotEmissive}
            emissiveIntensity={copilotIntensity}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* TRACKPAD */}
      <mesh name="trackpad" position={[-0.2, 0.005, 0.55]} receiveShadow>
        <boxGeometry args={[0.65, 0.002, 0.42]} />
        <meshStandardMaterial
          color="#1a1c24"
          emissive={trackpadEmissive}
          emissiveIntensity={trackpadIntensity}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* DISPLAY LID */}
      <group name="lid" position={[0, 0, -0.8]} rotation={[-0.45, 0, 0]}>
        <mesh position={[0, 0.75, -0.02]} castShadow>
          <boxGeometry args={[2.4, 1.5, 0.04]} />
          <meshStandardMaterial color="#0d0e12" roughness={0.25} metalness={0.75} />
        </mesh>

        <mesh position={[0, 0.75, -0.042]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.35, 0.08]} />
          <meshStandardMaterial
            color="#ff3b00"
            emissive="#ff3b00"
            emissiveIntensity={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[0, 0.75, 0.005]}>
          <boxGeometry args={[2.35, 1.45, 0.01]} />
          <meshStandardMaterial color="#050507" roughness={0.9} />
        </mesh>

        <mesh name="display" position={[0, 0.76, 0.013]}>
          <planeGeometry args={[2.2, 1.3]} />
          {displayCanvas ? (
            <meshBasicMaterial map={displayCanvas} />
          ) : (
            <meshStandardMaterial
              color="#080e1a"
              emissive="#3b82f6"
              emissiveIntensity={0.15}
              roughness={0.1}
            />
          )}
        </mesh>

        <mesh name="camera" position={[0, 1.44, 0.012]}>
          <sphereGeometry args={[0.012, 16, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* DUAL FAN COOLING VENTS */}
      <group name="vents" position={[0, -0.04, -0.78]}>
        <mesh name="fanleft" position={[-0.8, 0, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.05]} />
          <meshStandardMaterial
            color="#0a0a0d"
            emissive={leftFanEmissive}
            emissiveIntensity={leftFanIntensity}
            roughness={0.8}
          />
        </mesh>
        <mesh name="fanright" position={[0.8, 0, 0]}>
          <boxGeometry args={[0.5, 0.05, 0.05]} />
          <meshStandardMaterial
            color="#0a0a0d"
            emissive={rightFanEmissive}
            emissiveIntensity={rightFanIntensity}
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* LEFT PORTS (Semantic highlight support) */}
      <group name="leftports" position={[-1.205, -0.03, 0]}>
        {/* DC Power */}
        <mesh name="dcPower" position={[0, 0, -0.4]}>
          <boxGeometry args={[0.02, 0.03, 0.08]} />
          <meshStandardMaterial
            color="#334155"
            emissive={portHighlight === 'POWER_ETHERNET' ? '#ff3b00' : leftPortsEmissive}
            emissiveIntensity={portHighlight === 'POWER_ETHERNET' ? 0.9 : leftPortsIntensity}
            metalness={0.9}
          />
        </mesh>
        {/* Ethernet RJ-45 */}
        <mesh name="ethernet" position={[0, 0, -0.2]}>
          <boxGeometry args={[0.02, 0.03, 0.12]} />
          <meshStandardMaterial
            color="#334155"
            emissive={portHighlight === 'POWER_ETHERNET' ? '#ff3b00' : leftPortsEmissive}
            emissiveIntensity={portHighlight === 'POWER_ETHERNET' ? 0.9 : leftPortsIntensity}
            metalness={0.9}
          />
        </mesh>
        {/* HDMI */}
        <mesh name="hdmi" position={[0, 0, 0.0]}>
          <boxGeometry args={[0.02, 0.025, 0.1]} />
          <meshStandardMaterial
            color="#334155"
            emissive={portHighlight === 'HDMI' ? '#3b82f6' : leftPortsEmissive}
            emissiveIntensity={portHighlight === 'HDMI' ? 0.9 : leftPortsIntensity}
            metalness={0.9}
          />
        </mesh>
        {/* USB-A 1 & 2 */}
        <mesh name="leftUsbA1" position={[0, 0, 0.2]}>
          <boxGeometry args={[0.02, 0.02, 0.14]} />
          <meshStandardMaterial color="#334155" emissive={leftPortsEmissive} emissiveIntensity={leftPortsIntensity} metalness={0.9} />
        </mesh>
        {/* USB-C */}
        <mesh name="usbC" position={[0, 0, 0.45]}>
          <boxGeometry args={[0.02, 0.015, 0.08]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive={portHighlight === 'USB_C' ? '#38bdf8' : leftPortsEmissive}
            emissiveIntensity={portHighlight === 'USB_C' ? 1.0 : leftPortsIntensity}
            metalness={0.9}
          />
        </mesh>
      </group>

      {/* RIGHT PORTS (Semantic highlight support) */}
      <group name="rightports" position={[1.205, -0.03, 0]}>
        {/* USB-A */}
        <mesh name="rightUsbA" position={[0, 0, 0.1]}>
          <boxGeometry args={[0.02, 0.02, 0.08]} />
          <meshStandardMaterial
            color="#334155"
            emissive={portHighlight === 'RIGHT_USB_A' ? '#3b82f6' : rightPortsEmissive}
            emissiveIntensity={portHighlight === 'RIGHT_USB_A' ? 0.9 : rightPortsIntensity}
            metalness={0.9}
          />
        </mesh>
        {/* 3.5mm Headphone Jack */}
        <mesh name="headphone" position={[0, 0, 0.3]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.02, 16]} />
          <meshStandardMaterial
            color="#1e293b"
            emissive={portHighlight === 'HEADPHONE' ? '#a855f7' : rightPortsEmissive}
            emissiveIntensity={portHighlight === 'HEADPHONE' ? 0.9 : rightPortsIntensity}
            metalness={0.8}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
