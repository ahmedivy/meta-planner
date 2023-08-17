"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export default ThemeProvider;