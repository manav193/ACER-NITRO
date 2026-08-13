# ACER NITRO ANV15-41 — Cinematic Product Experience

> An independent portfolio concept exploring cinematic 3D product storytelling, scroll-driven interaction, and interactive hardware exploration built with Next.js, React Three Fiber, GSAP, and Lenis.

---

## Disclaimer & Portfolio Notice

> [!NOTE]
> **INDEPENDENT PORTFOLIO PROJECT**: This website is an independent promotional portfolio concept and software architecture showcase. It is **not** an official Acer product page or affiliated with Acer Inc. All product names, trademarks, and registered trademarks belong to their respective owners.

---

## 1. Overview

The **Acer Nitro ANV15-41 Cinematic Product Experience** is a high-performance web experience designed to showcase modern gaming laptop hardware through filmic 3D camera choreography. Moving away from static product specification grids, the application presents the hardware through a 24-scene scroll-driven narrative that takes users on an anatomical journey through the laptop's key components—from the AMD Ryzen 5 CPU and NVIDIA RTX 3050 GPU to the dual-fan thermal cooling system, full-size white-backlit keyboard deck, and full I/O ports array.

---

## 2. Key Features

- **24-Scene Cinematic Scroll Story**: A single, deterministic GSAP keyframed timeline pinned to smooth Lenis scroll scrubbing.
- **Interactive 3D Category Explorer**: Jump seamlessly between hardware categories (Performance, Display, Memory, Storage, Cooling, Input, Ports) with dynamic camera macro re-framing.
- **Controlled 3D Drag Rotation**: High-precision manual 3D model rotation mode with clamped pitch/yaw boundaries and smooth damping.
- **Pure White Keyboard Deck Backlight**: Enforced neutral white (`#ffffff`) illumination with dedicated macro key highlights for NitroSense and Copilot.
- **Dual-Fan Thermal Visualization**: Underside chassis reveal with directional thermal airflow motes.
- **Port-Specific Signal Visualizations**: Conceptual motes representing Ethernet network nodes, HDMI display rays, USB-C data streams, and 3.5mm analog audio pulses.
- **Accessible Editorial Specification Overview**: Clean DOM-rendered specification typography accessible without WebGL or canvas dependencies.
- **Strict Hardware Accuracy**: Enforces verified source-of-truth hardware data without unverified benchmark scores or fabricated marketing claims.
- **Graceful WebGL Fallback**: High-performance 2D fallback (`Fallback2D.tsx`) for restricted GPU or non-WebGL environments.

---

## 3. Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **3D Graphics & Canvas**: [Three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Animation & Pinned Scroll**: [GSAP](https://gsap.com/) (ScrollTrigger, `gsap.context()` isolation)
- **Smooth Scrolling**: [Lenis](https://lenis.darkroom.engineering/)

---

## 4. Architecture Overview

```
SceneManager (Root Container & Isolated Scroll Layers)
 ├── 1. Fixed 3D Canvas Layer
 │    └── NitroScene (WebGL Canvas, DPR Scaling, Post-Processing)
 │         ├── Environment & Lighting (Hero, Display, & Deck Presets)
 │         ├── CameraRig (Responsive Camera State Interpolation)
 │         ├── LaptopModel (GLB Asset Loader / Procedural Fallback)
 │         ├── CoolingAirflow (Directional Particle System)
 │         └── SignalVisualization (Ethernet, HDMI, USB-C, Audio Signals)
 ├── 2. Isolated Pinned Scroll Layer (Prevents React DOM Reconciliation Errors)
 │    └── 24 Narrative Sections (Hero, Cpu, Gpu, Display, Memory, Storage, Cooling, Keyboard, Ports, SpecOverview, ProductExplorer, Finale)
 └── 3. Overlay Layer
      ├── DevModelNotice (Telemetry & Asset Mode Badge)
      └── DebugPanel (Shift + D Inspector)
```

---

## 5. Narrative Timeline (24 Story Scenes)

| Scene | Title / Focus | Camera Preset | Progress |
| :--- | :--- | :--- | :--- |
| **01** | Hero Introduction | `HERO` | `0.00 - 0.05` |
| **02** | AMD Ryzen™ 5 6600H CPU | `FRONT` | `0.05 - 0.10` |
| **03** | NVIDIA® GeForce RTX™ 3050 GPU | `THREE_QUARTER` | `0.10 - 0.15` |
| **04** | 15.6" 165Hz FHD IPS Display | `DISPLAY_CLOSE` | `0.15 - 0.20` |
| **05** | 16GB DDR5 System Memory | `KEYBOARD_CLOSE` | `0.20 - 0.25` |
| **06** | 512GB NVMe SSD Storage | `FRONT` | `0.25 - 0.30` |
| **07** | Dual-Fan Thermal Intake & Exhaust | `BOTTOM` | `0.30 - 0.36` |
| **08** | Full-Size Keyboard Deck | `KEYBOARD_CLOSE` | `0.36 - 0.41` |
| **09** | Numeric Keypad (NUMPAD) | `NUMPAD_CLOSE` | `0.41 - 0.46` |
| **10** | Clean White Backlight (`#ffffff`) | `KEYBOARD_CLOSE` | `0.46 - 0.51` |
| **11** | Dedicated NitroSense Thermal Key | `NITROSENSE_CLOSE` | `0.51 - 0.56` |
| **12** | Dedicated AI Copilot Key | `COPILOT_CLOSE` | `0.56 - 0.61` |
| **13** | Precision Tactile Trackpad | `TRACKPAD_CLOSE` | `0.61 - 0.66` |
| **14** | Ports Array Intro (Connect. Create. Play.) | `PORTS_INTRO` | `0.66 - 0.70` |
| **15** | Left Chassis Ports Array | `LEFT_PORTS` | `0.70 - 0.74` |
| **16** | DC Power Input & RJ-45 Ethernet | `LEFT_POWER` | `0.74 - 0.77` |
| **17** | HDMI External Display Output | `LEFT_HDMI` | `0.77 - 0.80` |
| **18** | USB-C Charging Port | `LEFT_USB_C` | `0.80 - 0.83` |
| **19** | Right Chassis Ports Array (USB-A & 3.5mm) | `RIGHT_HEADPHONE` | `0.83 - 0.86` |
| **20** | Full I/O Ports Array Summary | `PORTS_SUMMARY` | `0.86 - 0.88` |
| **21** | Full Product Reveal | `HERO` | `0.88 - 0.91` |
| **22** | Complete Specifications Overview | `THREE_QUARTER` | `0.91 - 0.94` |
| **23** | Interactive Category Explorer & 3D Drag | `THREE_QUARTER` | `0.94 - 0.97` |
| **24** | Cinematic Hero Finale & Replay | `HERO` | `0.97 - 1.00` |

---

## 6. Verified Hardware Source of Truth

All hardware parameters displayed across the application are strictly restricted to verified source-of-truth data:

- **Model**: Acer Nitro V 15 (`ANV15-41`)
- **CPU**: AMD Ryzen™ 5 6600H Processor
- **GPU**: NVIDIA® GeForce RTX™ 3050 Laptop GPU (6GB GDDR6 VRAM)
- **RAM**: 16GB DDR5 RAM (Expandable up to 32GB via dual slots)
- **Storage**: 512GB NVMe SSD (Expandable M.2 storage)
- **Display**: 15.6-inch Full HD (1920 × 1080) IPS, 165Hz Refresh Rate (16:9)
- **Keyboard**: Full-size with NUMPAD, **White-only backlight** (`#ffffff` strictly, non-RGB), dedicated NitroSense key, dedicated Copilot key
- **Webcam**: HD Camera
- **Cooling**: Dual-Fan Cooling System (Intake vents & rear exhaust)
- **Left Ports**: DC Power Input, RJ-45 Ethernet, HDMI, 2 × USB Type-A, 1 × USB Type-C (with charging support)
- **Right Ports**: 1 × USB Type-A, 3.5mm Headphone / Audio Combo Jack

---

## 7. 3D Model Asset Policy & Fallback Architecture

The repository is built with an authoritative GLB drop-in loader boundary:

- **Expected Path**: `public/models/nitro-anv15-41.glb`
- **Asset Status**: The physical GLB asset file is currently absent on disk.
- **Fallback Architecture**: `LaptopModel.tsx` detects asset availability. When `nitro-anv15-41.glb` is absent, the application renders a high-tech procedural 3D laptop model without layout shifts, console errors, or broken states.
- **Normalization Pipeline**: When `nitro-anv15-41.glb` is dropped into `public/models/`, `normalizeLaptopTransform` automatically centers geometry at `[0, 0, 0]` and scales bounding width to `2.4` units, allowing the production GLB to immediately inherit all existing camera presets and timeline keyframes.

---

## 8. Getting Started & Local Development

### Prerequisites
- Node.js 18.x or 20.x
- npm or pnpm

### Installation
```bash
git clone https://github.com/manav193/ACER-NITRO.git
cd ACER-NITRO
npm install
```

### Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Development Telemetry Inspector
Press `Shift + D` or append `?debug=true` to the URL to toggle the 3D Telemetry Debug Inspector overlay.

---

## 9. Production Build & Verification

```bash
# Typecheck validation
npm run typecheck

# Production build
npm run build

# Start production server
npm run start
```

---

## 10. Repository Structure

```
ACER-NITRO/
├── public/
│   └── models/
│       └── README.md
├── src/
│   ├── animations/
│   │   ├── laptopController.ts
│   │   └── storyTimeline.ts
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CameraRig.tsx
│   │   │   ├── CoolingAirflow.tsx
│   │   │   ├── Effects.tsx
│   │   │   ├── Environment.tsx
│   │   │   ├── LaptopModel.tsx
│   │   │   ├── Lighting.tsx
│   │   │   ├── NitroScene.tsx
│   │   │   └── SignalVisualization.tsx
│   │   ├── experience/
│   │   │   ├── ExperienceController.tsx
│   │   │   ├── SceneManager.tsx
│   │   │   └── ScrollController.tsx
│   │   ├── explorer/
│   │   │   └── ProductExplorer.tsx
│   │   ├── sections/
│   │   │   ├── CoolingSection.tsx
│   │   │   ├── CpuSection.tsx
│   │   │   ├── DisplaySection.tsx
│   │   │   ├── FinaleSection.tsx
│   │   │   ├── GpuSection.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── KeyboardSection.tsx
│   │   │   ├── MemorySection.tsx
│   │   │   ├── PortsSection.tsx
│   │   │   ├── SpecOverviewSection.tsx
│   │   │   └── StorageSection.tsx
│   │   └── ui/
│   │       ├── DebugPanel.tsx
│   │       ├── DevModelNotice.tsx
│   │       └── Fallback2D.tsx
│   ├── data/
│   │   └── nitroSpecs.ts
│   ├── lib/
│   │   ├── cameraPresets.ts
│   │   ├── constants.ts
│   │   ├── keyboardLighting.ts
│   │   ├── lightingPresets.ts
│   │   ├── normalization.ts
│   │   ├── partRegistry.ts
│   │   └── performance.ts
│   └── types/
│       └── index.ts
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## 11. License & Credits

- Designed & Developed as an independent portfolio showcase.
- Technologies powered by Next.js, Three.js, React Three Fiber, GSAP, and Lenis.
