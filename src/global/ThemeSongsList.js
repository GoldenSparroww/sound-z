import { createTheme } from '@mui/material/styles';
import Colors from './Colors.js';

// &.something → aktuální element MÁ classu something
// & .something → uvnitř aktuálního elementu JE potomek s classou something

const themeSongsList = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        primary: {
          color: Colors.color_empty_field,
          fontSize: '1.2rem',
        },
        h6: {
          color: Colors.color_empty_field,
        },
        h1: {
          color: Colors.color_empty_field,
        },
      }
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1.2rem',
        },
        secondary: {
          fontSize: '0.9rem',
          color: Colors.color_empty_field,
        },
      }
    },

    MuiList: {
      styleOverrides: {
        root: {
          '&::-webkit-scrollbar': {
            display: 'none',        // Skrýt scroll bar pro WebKit prohlížeče (Chrome, Safari)
          },
          scrollbarWidth: 'none',   // Skrytí scrollu ve Firefoxu
        }
      }
    },

    MuiListItemButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: Colors.color_empty_field,
          transition: 'none',

          '&.Mui-selected': {
            /* Pozadi nastavim na stejnou barvu jako bez kliknuti, abych to nemusel vypinat */
            backgroundColor: Colors.color_background,
            color: Colors.color_details,
          },

          '&:hover': {
            backgroundColor: Colors.color_hover,
          },

          '&.Mui-selected:hover': {
            backgroundColor: Colors.color_hover,
          },

          '& .MuiListItemIcon-root': {
            color: Colors.color_empty_field,
            //fontSize: 40,
          },
        },
      },
    },
  },
});

export default themeSongsList;
