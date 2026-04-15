import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import FluidWave from '@/components/fluid-wave'; // Adjust import path if needed

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Swagato Das | Academic Portfolio',
  description: 'Academic Portfolio of Swagato Das, Master of Statistics at ISI Kolkata.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Suppress hydration warning is needed for next-themes
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body className="bg-white dark:bg-black text-zinc-600 dark:text-zinc-300 font-sans antialiased selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-black dark:selection:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <FluidWave />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
