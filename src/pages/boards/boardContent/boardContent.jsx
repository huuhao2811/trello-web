import ListColumns from './ListColumns/ListColums'
import Box from '@mui/material/Box'
import { mapOrder } from '~/utils/sort'
function BoardContent({board}) {
  const orderColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0',
        borderTop: '2px solid #0000FF'
      }}>
      <ListColumns columns = {orderColumns} />
    </Box>
  )
}

export default BoardContent
