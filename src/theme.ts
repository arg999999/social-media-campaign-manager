import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',

    primary: {
      main: '#030213'
    },

    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },

    text: {
      primary: 'rgba(0,0,0,0.9)',
      secondary: '#717182'
    },

    divider: 'rgba(0,0,0,0.1)',

    error: {
      main: '#d4183d'
    }
  },

  shape: {
    borderRadius: 10
  },

  typography: {
    fontSize: 16,
    fontWeightMedium: 500,
    fontWeightRegular: 400
  }
});
