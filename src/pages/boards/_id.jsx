import Container from '@mui/material/Container'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '../../theme.js'
import AppBar from '../../components/AppBar/AppBar.jsx'/* The board bar is the top bar of the board, it contains the board name and other actions */
import BoardBar from './boardBar/boardBar.jsx' /* The board bar is the top bar of the board, it contains the board name and other actions */
import BoardContent from './boardContent/boardContent.jsx'/* The board content is the main area of the board, it contains the lists and cards */
import { mockData } from '~/apis/mock-data.js' /* Import mock data for testing purposes */
function Board() {
  return (
    <CssVarsProvider theme={theme}>
      <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
        <AppBar />
        <BoardBar board = {mockData?.board}/>
        <BoardContent board = {mockData?.board}/>
      </Container>
    </CssVarsProvider>
  )
}

export default Board