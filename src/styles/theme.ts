import { indigo, lightGreen, orange, purple, red } from '@mui/material/colors';
import { createTheme, PaletteColor, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    purple: PaletteColor;
  }

  interface PaletteOptions {
    purple?: PaletteColorOptions;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#84C340',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#12344a',
    },
    background: {
      default: '#F8F9FD',
      paper: '#FFFFFF',
    },
    success: {
      main: lightGreen[400],
      contrastText: lightGreen[50],
      dark: '#3FC368',
    },
    error: {
      main: red[400],
      contrastText: red[50],
    },
    warning: {
      main: orange[400],
      contrastText: orange[50],
    },
    info: {
      main: indigo[500],
      contrastText: indigo[50],
    },
    purple: {
      main: '#9076C7',
      contrastText: purple[50],
    },
    text: {
      primary: '#12344A',
      secondary: '#85C440',
    },
    grey: {
      50: '#f5f5f5',
      100: '#0000001f',
      300: '#C7C7C7',
      500: '#848898',
    },
  },
  typography: {
    fontFamily: 'Barlow, sans-serif',
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#262927',
    },
    body1: {
      fontSize: 14,
      color: '#9697AF',
      lineHeight: 1.3,
    },
    subtitle2: {
      fontWeight: 700,
      fontSize: 18,
      lineHeight: '120%',
      letterSpacing: '0%',
      color: '#12344A',
    },
  },
  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
        },
        outlined: {
          color: '#12344A',
          border: '2px solid #84C340',
        },
      },
    },
  },
});

export default theme;
