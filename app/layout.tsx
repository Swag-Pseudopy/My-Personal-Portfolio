import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import FluidWave from '@/components/fluid-wave'; 

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Swagato Das | Academic Portfolio',
  description: 'Academic Portfolio of Swagato Das, Master of Statistics at ISI Kolkata.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      {/* Changed duration-300 to duration-700 for a smooth, cinematic fade */}
      <body className="bg-white dark:bg-black text-zinc-600 dark:text-zinc-300 font-sans antialiased selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white">
        
        {/* We disable system here because our custom TimeBasedThemer now handles the logic */}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <FluidWave />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
