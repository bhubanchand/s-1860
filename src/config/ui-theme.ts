
/**
 * Central UI/UX configuration file
 * Edit these values to update your site's appearance globally
 */

export const uiConfig = {
  // Color scheme
  colors: {
    // Primary brand colors
    primary: "#10b981", // Default green
    secondary: "#4b5563",
    accent: "#ff5722",
    
    // Text colors
    textPrimary: "#ffffff",
    textSecondary: "#e5e7eb",
    textMuted: "#9ca3af",
    
    // Background colors
    background: "#000000", // AMOLED black
    backgroundSecondary: "#121212",
    cardBackground: "#1a1a1a",
    
    // Border colors
    border: "#333333",
    divider: "#222222",
    
    // Status colors
    success: "#10b981",
    error: "#ef4444",
    warning: "#f59e0b",
    info: "#3b82f6",
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: '"Inter", system-ui, -apple-system, sans-serif',
      heading: '"Inter", system-ui, -apple-system, sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
    lineHeights: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },
  
  // Spacing
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
  },
  
  // Border radius
  borderRadius: {
    none: "0",
    sm: "0.125rem",
    DEFAULT: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
    xl: "0.75rem",
    "2xl": "1rem",
    full: "9999px",
  },
  
  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
  
  // Animations
  animations: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      ease: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
      easeIn: "cubic-bezier(0.42, 0, 1.0, 1.0)",
      easeOut: "cubic-bezier(0, 0, 0.58, 1.0)",
      easeInOut: "cubic-bezier(0.42, 0, 0.58, 1.0)",
    },
  },
  
  // Layout
  layout: {
    containerMaxWidth: "1200px",
    sidebarWidth: "250px",
    headerHeight: "64px",
    footerHeight: "80px",
  },
  
  // Blog-specific
  blog: {
    featuredPostSize: "large", // large, medium, small
    postsPerPage: 9,
    showAuthor: true,
    showDate: true,
    showReadTime: true,
    showTags: true,
  },
  
  // Media query breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

// Helper function to access UI config values
export const getUiValue = (path: string): any => {
  const keys = path.split('.');
  let result = uiConfig as any;
  
  for (const key of keys) {
    if (result[key] === undefined) {
      console.warn(`UI config path "${path}" does not exist`);
      return undefined;
    }
    result = result[key];
  }
  
  return result;
};

// Export a CSS Variables generator to use in components
export const generateCssVariables = (): Record<string, string> => {
  return {
    // Colors
    "--color-primary": uiConfig.colors.primary,
    "--color-secondary": uiConfig.colors.secondary,
    "--color-accent": uiConfig.colors.accent,
    "--color-text-primary": uiConfig.colors.textPrimary,
    "--color-text-secondary": uiConfig.colors.textSecondary,
    "--color-text-muted": uiConfig.colors.textMuted,
    "--color-background": uiConfig.colors.background,
    "--color-background-secondary": uiConfig.colors.backgroundSecondary,
    "--color-card-background": uiConfig.colors.cardBackground,
    "--color-border": uiConfig.colors.border,
    "--color-divider": uiConfig.colors.divider,
    "--color-success": uiConfig.colors.success,
    "--color-error": uiConfig.colors.error,
    "--color-warning": uiConfig.colors.warning,
    "--color-info": uiConfig.colors.info,
    
    // Typography
    "--font-family-sans": uiConfig.typography.fontFamily.sans,
    "--font-family-heading": uiConfig.typography.fontFamily.heading,
    "--font-family-mono": uiConfig.typography.fontFamily.mono,
    
    // Spacing
    "--spacing-xs": uiConfig.spacing.xs,
    "--spacing-sm": uiConfig.spacing.sm,
    "--spacing-md": uiConfig.spacing.md,
    "--spacing-lg": uiConfig.spacing.lg,
    "--spacing-xl": uiConfig.spacing.xl,
    "--spacing-2xl": uiConfig.spacing["2xl"],
    "--spacing-3xl": uiConfig.spacing["3xl"],
    
    // Layout
    "--container-max-width": uiConfig.layout.containerMaxWidth,
    "--sidebar-width": uiConfig.layout.sidebarWidth,
    "--header-height": uiConfig.layout.headerHeight,
    "--footer-height": uiConfig.layout.footerHeight,
  };
};

// Export types for TypeScript support
export type UiConfigColors = typeof uiConfig.colors;
export type UiConfigType = typeof uiConfig;
