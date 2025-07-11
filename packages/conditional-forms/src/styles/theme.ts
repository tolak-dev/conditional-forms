import { createTheme, type ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      borderRadius: number;
      inputHeight: number;
    };
  }

  interface ThemeOptions {
    custom?: {
      borderRadius?: number;
      inputHeight?: number;
    };
  }
}

export const themeOptions: ThemeOptions = {
  typography: {
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.8125rem',
      lineHeight: 1.4,
    },
    button: {
      fontSize: '0.8125rem',
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#2a4759',
      light: '#3b82f6',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f79b72',
      light: '#fbbf93',
      dark: '#c96a44',
      contrastText: '#ffffff',
    },
    background: {
      default: '#edefef',
      paper: '#ffffff',
    },
    text: {
      primary: '#282f3a',
      secondary: '#868a92',
    },
    divider: 'rgba(148, 163, 184, 0.36)',
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  custom: {
    borderRadius: 6,
    inputHeight: 40,
  },
  components: {},
};

export const theme = createTheme(themeOptions);
