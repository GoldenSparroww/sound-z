import { createTheme } from '@mui/material/styles';
import Colors from './Colors.js';

// &.something → aktuální element MÁ classu something
// & .something → uvnitř aktuálního elementu JE potomek s classou something

const theme = createTheme({
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
            fontSize: '1.2em',
        }
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
          transition: 'none',
          height: "100px",

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
        },
      },
    },
  },
});

export default theme;
