import { createTheme } from '@mui/material/styles';
import {experimental_extendTheme as extendTheme} from '@mui/material/styles';
import { deepOrange, red,orange,cyan,teal } from '@mui/material/colors';
import { BorderColor } from '@mui/icons-material';

// Create a theme instance.
const theme = createTheme({
    trelloCustom: {
        appBarHeight: '52px',
        boardBarHeight: '58px'
    },
    colorSchemes: {
        light: {
            palette: {
                primary:teal,
                secondary: deepOrange
            },
        },
        dark: {
            palette: {
                primary: cyan,
                secondary: orange
            },
        },
    }, 
    components: {
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    textTransform : 'none'
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                // Name of the slot
                root: ({theme}) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem'
                }),
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    body: {
                        '*:: -webkit - scrollbar': {
                            width: '8px',
                            height: '8px'
                        },
                        '*:: -webkit - scrollbar - thumb': {
                            backgroundColor: '#bd3c7',
                            borderRadius: '8px'
                        },
                        '*:: -webkit - scrollbar - thumb::hover': {
                            backgroundColor: '#00b894'
                        }
                    }
                    

                },
            },
        },
        
        MuiOutlinedInput: {
            styleOverrides: {
                // Name of the slot
                root: ({theme}) => ({
                    color: theme.palette.primary.main,
                    fontSize:'0.875rem',
                    '.MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.light },
                    '&:hover': {
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor:theme.palette.primary.main
                        }
                    },
                    '& fieldset' : {
                        borderWidth: '1px !important'
                    }
                }),
            },
        },
      },
});

export default theme;