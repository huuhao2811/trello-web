import Container from '@mui/material/Container'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '../../theme.js'
import AppBar from '../../components/AppBar/index.jsx'/* The board bar is the top bar of the board, it contains the board name and other actions */
import BoardBar from './boardBar/index.jsx' /* The board bar is the top bar of the board, it contains the board name and other actions */
import BoardContent from './boardContent/index.jsx'/* The board content is the main area of the board, it contains the lists and cards */
function Board() {
  return (
    <CssVarsProvider theme={theme}>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar />
        <BoardContent />
      </Container>
    </CssVarsProvider>
  )
}

export default Board