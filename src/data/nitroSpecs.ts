export interface NitroLaptopSpecs {
  model: {
    name: string;
    series: string;
    fullCode: string;
    tagline: string;
  };
  processor: {
    brand: string;
    model: string;
    fullName: string;
  };
  graphics: {
    brand: string;
    model: string;
    vram: string;
    memoryType: string;
    fullName: string;
  };
  memory: {
    capacity: string;
    type: string;
    expandable: string;
    maxCapacity: string;
  };
  storage: {
    capacity: string;
    type: string;
    expandable: boolean;
    details: string;
  };
  display: {
    size: string;
    resolution: string;
    panelType: string;
    refreshRate: string;
    aspectRatio: string;
  };
  keyboard: {
    type: string;
    numpad: boolean;
    backlightColor: 'WHITE_ONLY';
    backlightDescription: string;
    dedicatedKeys: {
      nitroSense: boolean;
      copilot: boolean;
    };
  };
  webcam: {
    resolution: string;
  };
  cooling: {
    system: string;
    fans: number;
    description: string;
  };
  ports: {
    left: string[];
    right: string[];
  };
}

export const NITRO_ANV15_41_SPECS: NitroLaptopSpecs = {
  model: {
    name: 'Acer Nitro V 15',
    series: 'Nitro 15',
    fullCode: 'ANV15-41',
    tagline: 'POWER. PRECISION. POSSIBILITY.',
  },
  processor: {
    brand: 'AMD',
    model: 'Ryzen 5 6600H',
    fullName: 'AMD Ryzen™ 5 6600H',
  },
  graphics: {
    brand: 'NVIDIA',
    model: 'GeForce RTX 3050',
    vram: '6GB',
    memoryType: 'GDDR6',
    fullName: 'NVIDIA® GeForce RTX™ 3050 (6GB GDDR6)',
  },
  memory: {
    capacity: '16GB',
    type: 'DDR5',
    expandable: 'Expandable up to 32GB',
    maxCapacity: '32GB',
  },
  storage: {
    capacity: '512GB',
    type: 'NVMe SSD',
    expandable: true,
    details: '512GB NVMe SSD (Expandable Storage)',
  },
  display: {
    size: '15.6"',
    resolution: 'Full HD (1920 × 1080)',
    panelType: 'IPS',
    refreshRate: '165Hz',
    aspectRatio: '16:9',
  },
  keyboard: {
    type: 'Full-size with NUMPAD',
    numpad: true,
    backlightColor: 'WHITE_ONLY',
    backlightDescription: 'Clean White Backlight (Non-RGB)',
    dedicatedKeys: {
      nitroSense: true,
      copilot: true,
    },
  },
  webcam: {
    resolution: 'HD Camera',
  },
  cooling: {
    system: 'Dual-Fan Cooling',
    fans: 2,
    description: 'Dual-fan intake and exhaust thermal control',
  },
  ports: {
    left: [
      'DC Power Jack',
      'RJ-45 Ethernet',
      'HDMI Port',
      '2 × USB Type-A',
      '1 × USB Type-C',
    ],
    right: [
      '1 × USB Type-A',
      '3.5mm Headphone / Audio Combo Jack',
    ],
  },
};
