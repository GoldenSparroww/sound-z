import { createTheme } from '@mui/material/styles';
import Colors from './Colors.js';

// &.something → aktuální element MÁ classu something
// & .something → uvnitř aktuálního elementu JE potomek s classou something

const themeRecentlyPlayed = createTheme({
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: Colors.color_text,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 1,
          WebkitBoxOrient: 'vertical',
          textOverflow: 'ellipsis',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          lineHeight: '3.5rem',
          maxHeight: '3.5rem',
        }
      }
    },

    MuiCardActionArea: {
      defaultProps: {
        disableRipple: true,
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          color: Colors.color_empty_field,
          transition: '0.2s',

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

export default themeRecentlyPlayed;
