import { createTheme } from '@mui/material/styles';
import Colors from './Colors.js';

const ThemeForm = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: Colors.color_text,
        },
        primary: {
          color: Colors.color_empty_field,
          fontSize: '1.2rem',
        },
        h6: {
          color: Colors.color_empty_field,
        },
      }
    },

    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: Colors.color_text,
          boxShadow: 'none',
          textTransform: 'none',
          fontSize: "1rem",
          padding: '0.4rem 0.8rem', /* cca 6px 12px */
          border: '1px solid',
          lineHeight: 1.5,
          backgroundColor: Colors.color_footer,
          borderColor: Colors.color_empty_field,
          '&:hover': {
            backgroundColor: Colors.color_hover,
            borderColor: Colors.color_hover,
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
          '&:disabled': {
            opacity: 0.6,
            cursor: 'not-allowed',
            color: Colors.color_text,
          },
        }
      }
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: Colors.color_side_bar,
            color: Colors.color_text,
          },
          '& label.Mui-focused': {
            color: Colors.color_text,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: Colors.color_selection,
          },
          '& .MuiInputBase-input::placeholder': {
            color: Colors.color_text,
          },
          '& .MuiInputLabel-root': {
            color: Colors.color_text,
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: Colors.color_text,
            },
            '&:hover fieldset': {
              borderColor: Colors.color_text,
            },
            '&.Mui-focused fieldset': {
              borderColor: Colors.color_selection,
            },
          }
        }
      }
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: Colors.color_text,
          '&.Mui-checked': {
            color: Colors.color_details,
          },
          '&:hover': {
            backgroundColor: Colors.color_hover,
          },
        },
      },
    },

    MuiRadio: {
      styleOverrides: {
        root: {
          color: Colors.color_text,
          '&.Mui-checked': {
            color: Colors.color_details,
          },
          '&:hover': {
            backgroundColor: Colors.color_hover,
          },
        },
      },
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: '1.2rem',
          color: Colors.color_text,
          '&.Mui-focused': {
            color: Colors.color_details,
          },
        },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          color: Colors.color_text, // Barva textu pro FormControlLabel (např. "Track's name")
          fontSize: '1.2rem',
        },
      },
    },

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
  }
})

export default ThemeForm;
