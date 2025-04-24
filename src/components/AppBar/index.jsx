import ModeSelect from '../../components/ModeSelect/index.jsx'
import Box from '@mui/material/Box'


function AppBar() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary[300],
        width: '100%',
        height: (theme) => theme.trello.appBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
      <ModeSelect />
    </Box>
  )
}

export default AppBar