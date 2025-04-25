import Box from '@mui/material/Box'

const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function BoardContent() {
  return (
    <Box
      sx={{
        backgroundColor: '#F5F5DC',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.boardBarHeight})`,
        display: 'flex',
        borderTop: '2px solid #0000FF'
      }}>

      <Box sx = {{ 
        minWidth : '300px', maxWidth: '300px',
        backgroundColor: (theme) => theme.palette.primary[400],
        ml : 2,
        borderRadius: '6px'
      }}>
        <Box sx = {{

        }}>
          Header
        </Box>
        <Box sx = {{

        }}>
          List Card
        </Box>
        <Box sx = {{

        }}>
          Footer
        </Box>

      </Box>
    </Box>
  )
}

export default BoardContent
