import { createTheme } from '@mui/material/styles';
import Colors from './Colors.js';

const ThemeAudioControls = createTheme({
  components: {
    MuiListItemText: {
      defaultProps: {
        slotProps: {
          primary: {
            noWrap: true,
            sx: {
              overflow: "hidden",
              textOverflow: "ellipsis",
            }
          },
          secondary: {
            noWrap: true,
            sx: {
              overflow: "hidden",
              textOverflow: "ellipsis",
            }
          }
        }
      },
      styleOverrides: {
        primary: {
          fontSize: '1.5rem',
          color: Colors.color_details,
        },
        secondary: {
          fontSize: '1.2rem',
          color: Colors.color_details,
        },
      }
    },

    MuiTypography: {
      styleOverrides: {
        body1: {
          color: Colors.color_empty_field,
          fontSize: '1.2rem',
        },
      }
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: Colors.color_empty_field,
          height: '2.5rem',
          width: '2.5rem',
        },
      },
    },

    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          transition: '0.2s',
          height: '3rem',
          width: '3rem',
          color: Colors.color_side_bar,
          backgroundColor: Colors.color_details,
          '&:hover': {
            backgroundColor: Colors.color_details_hover,
            borderColor: Colors.color_details_hover,
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
            backgroundColor: Colors.color_selection,
            borderColor: Colors.color_selection,
          },
          '&:focus': {
            boxShadow: 'none',
          },
        }
      }
    },

  }
})

export default ThemeAudioControls;
