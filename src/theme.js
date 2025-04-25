import { teal,deepOrange, cyan, orange, blueGrey, blue } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme} from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`

const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: blue,
        secondary: teal
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'body, html': {
          '*::-webkit-scrollbar': {
            height: '8px',
            width: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#FFCC33',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#FFA000'
          }
        }
      }
    }, // not complete scrollbar
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          borderRadius: '8px'
        }),
        outlinedPrimary: ({ theme }) => ({
          borderColor: theme.palette.primary[900],
          color: theme.palette.primary[900],
          '&:hover': {
            borderColor: theme.palette.primary.dark
          }
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color : theme.palette.primary[900],
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            color : theme.palette.primary[900],
            fontSize : '0.875rem',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary[300]
            },
            '&:hover': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary[900]
              }
            },
            '& fieldset': {
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary[900]
              }
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary[900], // khi focus
              borderWidth: '2px' // tuỳ chỉnh thêm nếu thích
            }
          }
        }
      }
    }
  }
})

export default theme