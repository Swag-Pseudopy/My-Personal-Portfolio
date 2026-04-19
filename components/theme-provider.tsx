"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes";

function TimeBasedThemer({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    // 1. Check if the user has explicitly set a preference in their browser
    const userPreference = localStorage.getItem("theme");
    
    // If they have manually chosen a theme, respect it and stop executing!
    if (userPreference === "light" || userPreference === "dark") return;

    // 2. If it is their first time visiting, use their local clock
    const currentHour = new Date().getHours();
    
    // Define daytime as 6:00 AM to 6:00 PM (18:00)
    const isDaytime = currentHour >= 6 && currentHour < 18;

    if (isDaytime && theme !== 'light') {
      setTheme('light');
    } else if (!isDaytime && theme !== 'dark') {
      setTheme('dark');
    }
  }, [theme, setTheme]);

  // Prevent UI flashing before React mounts
  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <TimeBasedThemer>
        {children}
      </TimeBasedThemer>
    </NextThemesProvider>
  );
}
