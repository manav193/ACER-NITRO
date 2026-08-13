import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ExperienceController } from '@/components/experience/ExperienceController';

export const metadata: Metadata = {
  title: 'ACER NITRO ANV15-41 | Cinematic Gaming Laptop Experience',
  description:
    'Experience the Acer Nitro ANV15-41 powered by AMD Ryzen 5 6600H and NVIDIA GeForce RTX 3050. Ultra-responsive 165Hz FHD IPS display, DDR5 memory, dual-fan cooling, clean white backlit keyboard, and full I/O ports array.',
  keywords: [
    'Acer Nitro V 15',
    'ANV15-41',
    'AMD Ryzen 5 6600H',
    'NVIDIA RTX 3050',
    'Gaming Laptop',
    '165Hz FHD IPS',
    'DDR5 RAM',
    'Acer Nitro',
  ],
  authors: [{ name: 'Acer Nitro' }],
  openGraph: {
    title: 'ACER NITRO ANV15-41 | Interactive Product Experience',
    description:
      'Explore the Acer Nitro ANV15-41 in 3D. AMD Ryzen 5 6600H, NVIDIA GeForce RTX 3050 (6GB GDDR6), 165Hz IPS Display, and Dual-Fan Cooling.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACER NITRO ANV15-41 | Interactive Product Experience',
    description:
      'Explore the Acer Nitro ANV15-41 in 3D. AMD Ryzen 5 6600H, NVIDIA GeForce RTX 3050 (6GB GDDR6), 165Hz IPS Display, and Dual-Fan Cooling.',
  },
};

export const viewport: Viewport = {
  themeColor: '#090a0f',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-nitro-bg text-nitro-text antialiased selection:bg-nitro-red selection:text-white overflow-x-hidden">
        <ExperienceController>{children}</ExperienceController>
      </body>
    </html>
  );
}
