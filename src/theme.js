import { createTheme } from '@mui/material/styles'
import { deepOrange, red, orange, cyan, teal } from '@mui/material/colors'

const APP_BAR_HEIGHT = '52px'
const BOARD_BAR_HEIGHT = '58px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

const theme = createTheme({
    trelloCustom: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT
    },

    colorSchemes: {
        light: {
            palette: {
                // primary: teal,
                // secondary: deepOrange
            }
        },
        dark: {
            palette: {
                // primary: cyan,
                // secondary: orange
            }
        }
    },

    components: {
        // ✅ Custom Scrollbar
        MuiCssBaseline: {
            styleOverrides: {
                    body: {
                        '*::-webkit-scrollbar': {
                            width: '8px',
                            height: '8px'
                        },
                        '*::-webkit-scrollbar-thumb': {
                            backgroundColor: '#ccc',
                            borderRadius: '8px'
                        },
                        '*::-webkit-scrollbar-thumb:hover': {
                            backgroundColor: '#aaa'
                        }
                    }
            }
        },

        // ✅ Button
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    borderWidth: '0.5px',
                    '&:hover': { borderWidth: '0.5px' }
                }
            }
        },

        // ✅ Typography
        MuiTypography: {
            styleOverrides: {
                root: {
                    '&.MuiTypography-body1': {
                        fontSize: '0.875rem'
                    }
                }
            }
        },

        // ✅ InputLabel
        MuiInputLabel: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem'
                })
            }
        },

        // ✅ OutlinedInput
        MuiOutlinedInput: {
            styleOverrides: {
                root: ({ theme }) => ({
                    fontSize: '0.875rem',
                    '& fieldset': {
                        borderWidth: '0.5px !important'
                    },
                    '&:hover fieldset': {
                        borderWidth: '1px !important'
                    },
                    '&.Mui-focused fieldset': {
                        borderWidth: '1px !important'
                    }
                })
            }
        }
    }
})

export default theme
