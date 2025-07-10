
import Box from '@mui/material/Box'
import Card from './Card/Card.jsx'


const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

function ListCards({cards}) {
  return (
    <Box
      sx={{
        p: '0 5px',
        m: '0 5px',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        overflowX: 'hidden',
        overflowY: 'auto',
        maxHeight: (theme) =>
          `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)} - ${COLUMN_HEADER_HEIGHT} - ${COLUMN_FOOTER_HEIGHT})`
      }}
    >
      {cards?.map((card) => <Card key={card._id} card={card} />)}
    </Box>
  )
}

export default ListCards
