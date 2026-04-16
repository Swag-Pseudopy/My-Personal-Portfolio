"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

// This inner component handles the time-logic after the provider mounts
function TimeBasedThemer({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    // Check if the user has manually clicked the moon/sun button
    // If they have, we respect their choice and stop overriding it.
    const userPreference = localStorage.getItem("theme");
    if (userPreference === "light" || userPreference === "dark") return;

    // Use the browser's highly accurate local clock (0-23 hours)
    const currentHour = new Date().getHours();
    
    // Define daytime as 6:00 AM to 6:00 PM (18:00)
    const isDaytime = currentHour >= 6 && currentHour < 18;

    if (isDaytime && theme !== 'light') {
      setTheme('light');
    } else if (!isDaytime && theme !== 'dark') {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  // Prevent hydration mismatch
  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      {...props} 
      // Force it to ignore the Apple/Android OS system settings
      enableSystem={false} 
    >
      <TimeBasedThemer>
        {children}
      </TimeBasedThemer>
    </NextThemesProvider>
  );
}
