import { createTheme } from '@mui/material/styles';
import Colors from './Colors.js';

// &.something → aktuální element MÁ classu something
// & .something → uvnitř aktuálního elementu JE potomek s classou something

const themeSideBar = createTheme({
  components: {
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: Colors.color_side_bar,
          backgroundColor: Colors.color_empty_field,
          '&:hover': {
            backgroundColor: Colors.color_hover,
            borderColor: Colors.color_hover,
            color: Colors.color_empty_field,
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
            backgroundColor: Colors.color_selection,
            borderColor: Colors.color_selection,
            color: Colors.color_empty_field,
          },
          '&:focus': {
            boxShadow: 'none',
          },
        }
      }
    },

    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '1.2rem',
        },
        secondary: {
          color: Colors.color_text,
        },
      }
    },

    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: Colors.color_side_bar,
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
          transition: '0.2s',
          height: "6.2rem", /* cca 100px ve 100% */

          '&.Mui-selected': {
            backgroundColor: Colors.color_selection,
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

          '&:active': {
            backgroundColor: Colors.color_selection,
          },
        },
      },
    },
  },
});

export default themeSideBar;
