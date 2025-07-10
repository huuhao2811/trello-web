import { teal,deepOrange, cyan, orange, blueGrey, blue } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme} from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const beige = {
  main: '#F5F5DC',
  contrastText: '#000000' // Màu chữ đi kèm trên nền be
}
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
        secondary: beige
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
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          '&.MuiTypography-body1': { fontSize: '0.875rem', color: theme.palette.secondary.main }
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