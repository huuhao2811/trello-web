import { teal,deepOrange, cyan, orange, blueGrey } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme} from '@mui/material/styles'


const theme = extendTheme({
  trello: {
    appBarHeight: '48px',
    boardBarHeight: '58px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: blueGrey,
        secondary: teal
      }
    },
    dark: {
      palette: {
        primary: cyan,
        secondary: orange
      }
    }
  }
})

export default theme