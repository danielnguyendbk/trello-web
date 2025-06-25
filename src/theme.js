import { createTheme } from '@mui/material/styles';
import {experimental_extendTheme as extendTheme} from '@mui/material/styles';
import { deepOrange, red,orange,cyan,teal } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
    trelloCustom: {
        appBarHeight: '48px',
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
    }
});

export default theme;