import Box from '@mui/material/Box'


function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary[900],
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}>
      Board Content
    </Box>
  )
}

export default BoardContent
