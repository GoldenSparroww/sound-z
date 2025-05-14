import { createTheme } from '@mui/material/styles';
import Colors from './Colors.js';

const ThemeSearchBar = createTheme({
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

    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            backgroundColor: Colors.color_empty_field,
            color: Colors.color_side_bar,
          },
          '& label.Mui-focused': {
            color: Colors.color_side_bar,
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: Colors.color_selection,
          },
          '& .MuiInputBase-input::placeholder': {
            color: Colors.color_side_bar,
          },
          '& .MuiInputLabel-root': {
            color: Colors.color_side_bar,
            paddingLeft: "0.6rem",
          },
          '& .MuiOutlinedInput-root': {
            borderRadius: '2rem',
            '& fieldset': {
              borderColor: Colors.color_side_bar,
            },
            '&:hover fieldset': {
              borderColor: Colors.color_side_bar,
            },
            '&.Mui-focused fieldset': {
              borderColor: Colors.color_selection,
            },
          },
        }
      }
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          padding: "0 0.5rem 0 0.5rem",
          borderRadius: '2rem',
          backgroundColor: Colors.color_empty_field,
          '&:hover': {
            backgroundColor: Colors.color_empty_field,
          },
          '&.Mui-focused': {
            backgroundColor: Colors.color_empty_field,
          },
          '&:before': {
            borderBottom: 'none',
            backgroundColor: "transparent",
          },
          '&:after': {
            borderBottom: 'none',
            backgroundColor: "transparent",
          },
          '&:hover:before': {
            borderBottom: 'none !important', // <- nutné, protože MUI přidává border-bottom při hover
          },
        }
      }
    }
  }
})

export default ThemeSearchBar;
